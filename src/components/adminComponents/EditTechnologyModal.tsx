"use client";
import { useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Proyecto {
  _id: string;
  titulo: string;
  slug: string;
}

interface EditTechnologyModalProps {
  tech: {
    _id: string;
    nombre: string;
    icono: {
      url: string;
      public_id: string;
    };
    descripcion?: string;
    rol?: {
      _id: string;
      nombre: string;
      descripcion: string;
    };
    proyectos?: { _id: string; slug: string }[]; // Array de IDs de proyectos relacionados
  };
  roles: { _id: string; nombre: string }[];
  proyectos: Proyecto[];
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditTechnologyModal({
  tech,
  roles,
  proyectos,
  onClose,
  onSuccess,
}: Readonly<EditTechnologyModalProps>) {
  const [nombre, setNombre] = useState(tech.nombre);
  const [descripcion, setDescripcion] = useState(tech.descripcion || "");
  const [newFile, setNewFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [rolId, setRolId] = useState(tech.rol?._id || "");
  const [proyectosSeleccionados, setProyectosSeleccionados] = useState(
    tech.proyectos || []
  );
  const [visible, setVisible] = useState(true);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleProyectoChange = (id: string) => {
    setProyectosSeleccionados((prev) => {
      const yaExiste = prev.some((p) => p._id === id);
      if (yaExiste) {
        return prev.filter((p) => p._id !== id);
      } else {
        const nuevoProyecto = proyectos.find((p) => p._id === id);
        // Asegurar que solo incluya las propiedades _id y slug
        if (nuevoProyecto) {
          const { _id, slug } = nuevoProyecto;
          return [...prev, { _id, slug }];
        }
        return prev;
      }
    });
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      let updatedIcon = tech.icono;

      if (newFile) {
        const formData = new FormData();
        formData.append("file", newFile);
        formData.append("public_id", tech.icono.public_id);
        formData.append("folder", "portfolio/Tecnologias");

        const imageRes = await fetch("/api/images/edit", {
          method: "PUT",
          body: formData,
        });

        if (!imageRes.ok) throw new Error("Error al subir la nueva imagen");

        const imageData = await imageRes.json();
        updatedIcon = {
          url: imageData.url,
          public_id: imageData.public_id,
        };
      }

      const res = await fetch(`/api/tecnologias/${tech._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          descripcion,
          icono: updatedIcon,
          rol: rolId,
          proyectos: proyectosSeleccionados,
        }),
      });

      if (!res.ok) throw new Error("Error al actualizar la tecnología");

      toast.success("Tecnología actualizada exitosamente");
      onSuccess();
    } catch (err) {
      toast.error("Error al actualizar la tecnología");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const handleAnimationComplete = () => {
    if (!visible) {
      onClose();
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <AnimatePresence mode="wait" onExitComplete={handleAnimationComplete}>
      {visible && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25 }}
            className="bg-white p-4 rounded-lg shadow-lg w-full max-w-sm"
          >
            <h2 className="text-base font-semibold mb-4">Editar Tecnología</h2>
            <div className="space-y-3 text-sm">
              {/* Nombre */}
              <div>
                <label className="block font-medium mb-1">Nombre</label>
                <input
                  className="w-full border rounded px-3 py-1.5"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>

              {/* Descripción */}
              <div>
                <label className="block font-medium mb-1">Descripción</label>
                <textarea
                  className="w-full border rounded px-3 py-1.5"
                  rows={2}
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>

              {/* Imagen */}
              <div>
                <label className="block font-medium mb-1">Icono</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <div className="mt-2">
                  <p className="text-xs text-gray-500">Vista previa:</p>
                  <div className="w-12 h-12 relative mt-1 border rounded overflow-hidden">
                    <Image
                      src={previewUrl || tech.icono.url}
                      alt="Icono"
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                </div>
              </div>

              {/* Rol */}
              <div>
                <label className="block font-medium mb-1">Rol</label>
                <select
                  value={rolId}
                  onChange={(e) => setRolId(e.target.value)}
                  className="w-full border rounded px-3 py-1.5"
                >
                  <option value="">Seleccionar un rol</option>
                  {roles.map((rol) => (
                    <option key={rol._id} value={rol._id}>
                      {rol.nombre}
                    </option>
                  ))}
                </select>
              </div>

              {/* Proyectos */}
              <div>
                <label className="block font-medium mb-1">
                  Proyectos (opcional):
                </label>
                <select
                  multiple
                  value={proyectosSeleccionados.map((p) => p._id)} // ← importante
                  onChange={(e) => {
                    const selectedId = Array.from(e.target.selectedOptions)
                      .map((option) => option.value)
                      .at(-1); // tomar solo el último seleccionado
                    if (selectedId) handleProyectoChange(selectedId);
                  }}
                  className="w-full border rounded px-3 py-1.5 h-24"
                >
                  {proyectos.map((proyecto) => (
                    <option key={proyecto._id} value={proyecto._id}>
                      {proyecto.titulo}
                    </option>
                  ))}
                </select>

                {proyectosSeleccionados.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs font-medium mb-1">Seleccionados:</p>
                    <ul className="flex flex-wrap gap-2">
                      {proyectosSeleccionados.map((id) => {
                        const p = proyectos.find((proj) => proj._id === id._id);
                        return (
                          <li
                            key={id._id}
                            className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs flex items-center gap-1"
                          >
                            {p?.titulo || "Proyecto desconocido"}
                            <button
                              type="button"
                              onClick={() =>
                                setProyectosSeleccionados((prev) =>
                                  prev.filter((pid) => pid !== id)
                                )
                              }
                              className="text-red-500 hover:text-red-700 text-sm"
                            >
                              ×
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Botones */}
            <div className="mt-5 flex justify-end gap-2 text-sm">
              <button
                onClick={handleCancel}
                className="px-3 py-1 border rounded hover:bg-gray-100"
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                onClick={handleUpdate}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
