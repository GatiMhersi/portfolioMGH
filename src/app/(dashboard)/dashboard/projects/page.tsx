"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type Proyecto = {
  _id: string;
  slug: string;
  titulo: string;
  descripcion?: string;
  detalles?: string;
  imagen?: string;
  tecnologias: string[];
};

export default function ProjectsPage() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const res = await fetch("/api/proyectos");
        const data = await res.json();
        setProyectos(data);
      } catch (error) {
        console.error("Error al cargar proyectos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProyectos();
  }, []);

  if (loading) return <p className="text-gray-600">Cargando proyectos...</p>;

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">Proyectos</h1>
      {proyectos.length === 0 ? (
        <p className="text-gray-500">No hay proyectos cargados.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {proyectos.map((proyecto, index) => (
            <motion.li
              key={proyecto._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.1}}
              className="bg-white rounded shadow p-4 hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {proyecto.titulo}
              </h2>
              <p className="text-gray-600 text-sm">{proyecto.descripcion}</p>
              {proyecto.imagen && (
                <div className="relative w-full h-40 mt-2 rounded overflow-hidden">
                  <Image
                    src={proyecto.imagen}
                    alt={proyecto.titulo}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </motion.li>
          ))}
        </ul>
      )}
    </section>
  );
}
