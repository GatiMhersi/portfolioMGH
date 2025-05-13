"use client";
import { useState } from "react";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";

interface Role {
  _id: string;
  nombre: string;
}

interface Proyecto {
  _id: string;
  titulo: string;
}

interface Props {
  onClose: () => void;
  roles: Role[];
  onSuccess: () => void;
  proyectos: Proyecto[];
}

export default function CreateTechnologyForm({
  onClose,
  roles,
  onSuccess,
  proyectos,
}: Props) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);
  const [rolId, setRolId] = useState<string>("");
  const [proyectosSeleccionados, setProyectosSeleccionados] = useState<
    string[]
  >([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file || !nombre.trim()) {
      toast.error("El nombre y la imagen son obligatorios.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "portfolio/Tecnologias");

      const uploadRes = await fetch("/api/images/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) throw new Error("Error al subir la imagen");

      const { url, public_id } = await uploadRes.json();

      const createRes = await fetch("/api/tecnologias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          descripcion,
          icono: { url, public_id },
          ...(rolId && { rol: rolId }),
          ...(proyectosSeleccionados.length > 0 && {
            proyectos: proyectosSeleccionados,
          }),
        }),
      });

      if (!createRes.ok) throw new Error("Error al crear la tecnología");

      toast.success("Tecnología creada exitosamente");
      onSuccess();
      setNombre("");
      setDescripcion("");
      setFile(null);
      setVisible(false);
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error al crear la tecnología");
    } finally {
      setLoading(false);
    }
  };

  const handleProyectoChange = (id: string) => {
    setProyectosSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleAnimationComplete = () => {
    if (!visible) {
      onClose();
    }
  };

  return (
    <AnimatePresence mode="wait" onExitComplete={handleAnimationComplete}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCancel}
          />

          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="bg-white rounded-lg p-6 w-full max-w-md mx-auto relative z-10 shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-4">
              Crear nueva tecnología
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Nombre de la tecnología"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
              />

              <textarea
                placeholder="Descripción (opcional)"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="w-full border rounded px-3 py-2"
                rows={3}
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full"
                required
              />

              <select
                value={rolId}
                onChange={(e) => setRolId(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Selecciona un rol (opcional)</option>
                {roles.map((rol) => (
                  <option key={rol._id} value={rol._id}>
                    {rol.nombre}
                  </option>
                ))}
              </select>

              <div className="space-y-2">
                <label className="font-semibold block">
                  Proyectos (opcional):
                </label>

                <select
                  multiple
                  value={proyectosSeleccionados}
                  onChange={(e) =>{
                    handleProyectoChange(e.target.value)
                    }
                  }
                  className="w-full border rounded px-3 py-2 h-32"
                >
                  {proyectos.map((proyecto) => (
                    <option key={proyecto._id} value={proyecto._id}>
                      {proyecto.titulo}
                    </option>
                  ))}
                </select>

                {proyectosSeleccionados.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium mb-1">Seleccionados:</p>
                    <ul className="flex flex-wrap gap-2">
                      {proyectosSeleccionados.map((id) => {
                        const p = proyectos.find((proj) => proj._id === id);
                        return (
                          <li
                            key={id}
                            className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm flex items-center gap-2"
                          >
                            {p?.titulo || "Proyecto desconocido"}
                            <button
                              type="button"
                              onClick={() =>
                                setProyectosSeleccionados((prev) =>
                                  prev.filter((pid) => pid !== id)
                                )
                              }
                              className="text-red-500 hover:text-red-700"
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

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 rounded border border-gray-400 text-gray-600 hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? "Creando..." : "Crear"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
