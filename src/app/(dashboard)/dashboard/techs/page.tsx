'use client';
import { TechCard } from "@/components/adminComponents/TechCard";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface Tecnologia {
  _id: string;
  nombre: string;
  icono: string;
  descripcion?: string;
}

export default function TechsPage() {
  const [tecnologias, setTecnologias] = useState<Tecnologia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTecnologias = async () => {
      try {
        const response = await fetch('/api/tecnologias');
        if (!response.ok) throw new Error('Error al obtener tecnologías');
        const data = await response.json();
        setTecnologias(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchTecnologias();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tecnologías</h1>
      <div className="flex flex-wrap gap-3">
        <AnimatePresence mode="wait">
          {tecnologias.map((tech, index) => (
            <TechCard
              key={tech._id}
              nombre={tech.nombre}
              icono={tech.icono}
              index={index} // Pasamos el índice para el stagger
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}