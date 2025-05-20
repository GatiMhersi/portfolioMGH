"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

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
  tecnologiasDisponibles: Tecnologia[];
  onClose: () => void;
  onProyectoCreado: (proyecto: Proyecto) => void;
};

export default function ProyectoForm({
  tecnologiasDisponibles,
  onClose,
  onProyectoCreado,
}: Readonly<Props>) {
  const [visible, setVisible] = useState(true);

  const [formData, setFormData] = useState({
    slug: "",
    titulo: "",
    descripcion: "",
    detalles: "",
    imagen: null as File | null,
    tecnologias: [] as string[],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, imagen: file }));
  };

  const handleAddTecnologia = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    if (!formData.tecnologias.includes(selectedId)) {
      setFormData((prev) => ({
        ...prev,
        tecnologias: [...prev.tecnologias, selectedId],
      }));
    }
    e.target.value = "";
  };

  const handleRemoveTecnologia = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      tecnologias: prev.tecnologias.filter((tid) => tid !== id),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let imageData = null;

      if (formData.imagen) {
        const uploadData = new FormData();
        uploadData.append("file", formData.imagen);
        uploadData.append("folder", "portfolio/Proyectos");

        const res = await fetch("/api/images/upload", {
          method: "POST",
          body: uploadData,
        });

        if (!res.ok) throw new Error("Error al subir la imagen");

        const { url, public_id } = await res.json();
        imageData = { url, public_id };
      }

      const resProyecto = await fetch("/api/proyectos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          imagen: imageData,
        }),
      });

      if (!resProyecto.ok) throw new Error("Error al crear el proyecto");

      const proyectoCreado = await resProyecto.json(); // asumimos que retorna el proyecto creado
      onProyectoCreado(proyectoCreado);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error desconocido");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAnimationComplete = () => {
    if (!visible) {
      onClose();
    }
  };

  return (
    <AnimatePresence mode="sync" onExitComplete={handleAnimationComplete}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setVisible(false)}
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
              onClick={() => setVisible(false)}
              className="absolute hover:bg-red-300 p-2 w-10 h-10 text-center flex flex-col items-center justify-center rounded-lg top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
            <form onSubmit={handleSubmit} className="space-y-5">
              <h2 className="text-2xl font-bold text-gray-800">
                Crear nuevo proyecto
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
                value={formData.descripcion}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={2}
              />

              <textarea
                name="detalles"
                placeholder="Detalles técnicos"
                value={formData.detalles}
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
                    const tec = tecnologiasDisponibles.find(
                      (t) => t._id === id
                    );
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
                {loading ? "Guardando..." : "Crear Proyecto"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
