"use client";

import { useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

type Proyecto = {
  _id: string;
  slug: string;
  titulo: string;
  descripcion?: string;
  detalles?: string;
  imagen?: { url: string; public_id: string };
  tecnologias: string[];
};

type Tecnologia = {
  _id: string;
  nombre: string;
};

type Props = {
  proyecto: Proyecto;
  tecnologiasDisponibles: Tecnologia[];
  onClose: () => void;
  onProyectoActualizado: () => void;
};

export default function EditarProyectoForm({
  proyecto,
  tecnologiasDisponibles,
  onClose,
  onProyectoActualizado,
}: Readonly<Props>) {
  const [formData, setFormData] = useState(proyecto);
  const [imagenFile, setImagenFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setImagenFile(e.target.files[0]);
  };

  const handleAddTecnologia = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value && !formData.tecnologias.includes(value)) {
      setFormData({ ...formData, tecnologias: [...formData.tecnologias, value] });
    }
    e.target.value = "";
  };

  const handleRemoveTecnologia = (id: string) => {
    setFormData({
      ...formData,
      tecnologias: formData.tecnologias.filter((tec) => tec !== id),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let nuevaImagen = formData.imagen;

      if (imagenFile) {
        const formDataImg = new FormData();
        formDataImg.append("file", imagenFile);
        formDataImg.append("public_id", proyecto.imagen?.public_id || "");
        formDataImg.append("folder", "portfolio/Proyectos");

        const imgRes = await fetch("/api/images/edit", {
          method: "PUT",
          body: formDataImg,
        });

        if (!imgRes.ok) throw new Error("Error al actualizar la imagen");
        nuevaImagen = await imgRes.json();
      }

      const res = await fetch(`/api/proyectos/${proyecto._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, imagen: nuevaImagen }),
      });

      if (!res.ok) throw new Error("Error al actualizar el proyecto");

      toast.success("Proyecto actualizado");
      onProyectoActualizado();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Error al guardar cambios");
      setError("Hubo un error al actualizar el proyecto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence mode="sync">
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative bg-white p-8 rounded-xl shadow-2xl max-w-xl w-full"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.8, opacity: 0, y: -50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: -50 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute hover:bg-red-300 p-2 w-10 h-10 flex items-center justify-center rounded-lg top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>

          <form onSubmit={handleSubmit} className="space-y-5">
            <h2 className="text-2xl font-bold text-gray-800">
              Editar Proyecto
            </h2>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <input
              type="text"
              name="slug"
              placeholder="Slug (ej. mi-proyecto)"
              value={formData.slug}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="text"
              name="titulo"
              placeholder="Título del proyecto"
              value={formData.titulo}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <textarea
              name="descripcion"
              placeholder="Descripción breve"
              value={formData.descripcion || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={2}
            />

            <textarea
              name="detalles"
              placeholder="Detalles técnicos"
              value={formData.detalles || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-md shadow-sm resize-y min-h-[150px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-700"
            />

            <div>
              <label htmlFor="select-tech" className="font-medium">
                Agregar tecnologías:
              </label>
              <select
                id="select-tech"
                onChange={handleAddTecnologia}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue=""
              >
                <option value="" disabled>
                  Selecciona una tecnología
                </option>
                {tecnologiasDisponibles
                  .filter((tec) => !formData.tecnologias.includes(tec._id))
                  .map((tec) => (
                    <option key={tec._id} value={tec._id}>
                      {tec.nombre}
                    </option>
                  ))}
              </select>

              <div className="mt-2 flex flex-wrap gap-2">
                {formData.tecnologias.map((id) => {
                  const tec = tecnologiasDisponibles.find((t) => t._id === id);
                  if (!tec) return null;
                  return (
                    <span
                      key={id}
                      className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tec.nombre}
                      <button
                        type="button"
                        onClick={() => handleRemoveTecnologia(id)}
                        className="ml-1 text-blue-500 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Guardando..." : "Guardar Cambios"}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
