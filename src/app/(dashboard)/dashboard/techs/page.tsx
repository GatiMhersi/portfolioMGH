// app/techs/page.tsx
'use client';
import CreateTechnologyForm from "@/components/adminComponents/CreateTechnologyForm";
import { TechCard } from "@/components/adminComponents/TechCard";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";

interface Tecnologia {
  _id: string;
  nombre: string;
  icono: {
    url: string;
    public_id: string;
  };
  descripcion?: string;
}

export default function TechsPage() {
  const [tecnologias, setTecnologias] = useState<Tecnologia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [roles, setRoles] = useState<{ _id: string; nombre: string }[]>([]);


  useEffect(() => {
    

    fetchTecnologias();
  }, []);

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

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch('/api/roles');
        if (!response.ok) throw new Error('Error al obtener roles');
        const data = await response.json();
        setRoles(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchRoles();
  }, []);

  
  

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="relative p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Tecnologías</h1>
      <div className="flex flex-wrap gap-3">
        <AnimatePresence mode="wait">
          {tecnologias.map((tech, index) => (
            <TechCard
              key={tech._id}
              nombre={tech.nombre}
              icono={tech.icono}
              index={index}
              id={tech._id}
              onSuccess={fetchTecnologias}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Botón flotante */}
      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-6 right-1/2 translate-x-1/2 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
        aria-label="Agregar tecnología"
      >
        +
      </button>

      {/* Modal para crear tecnología */}
      {showForm && (
  <CreateTechnologyForm onClose={() => setShowForm(false)} roles={roles} onSuccess={fetchTecnologias} />
)}


      <Toaster />
    </div>
  );
}
