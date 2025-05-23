// app/techs/page.tsx
"use client";
import CreateTechnologyForm from "@/components/adminComponents/CreateTechnologyForm";
import EditTechnologyModal from "@/components/adminComponents/EditTechnologyModal";
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
  rol?: {
    _id: string; 
    nombre: string; 
    descripcion: string
  };
  proyectos?: {_id: string; slug: string}[]; // Array de IDs de proyectos relacionados
}


interface Proyecto {
  _id: string;
  titulo: string;
  descripcion: string;
  tecnologias: string[]; // o cualquier otro campo que tenga tu modelo
  imagen?: string; // si tenés imagen destacada del proyecto
  slug: string;
}

export default function TechsPage() {
  const [tecnologias, setTecnologias] = useState<Tecnologia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [roles, setRoles] = useState<{ _id: string; nombre: string }[]>([]);
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [loadingProyectos, setLoadingProyectos] = useState(true);
  const [errorProyectos, setErrorProyectos] = useState<string | null>(null);
  const [editTech, setEditTech] = useState<Tecnologia | null>(null);

  useEffect(() => {
    fetchTecnologias();
    fetchProyectos();
    fetchRoles();
  }, []);

  const fetchTecnologias = async () => {
    try {
      const response = await fetch("/api/tecnologias");
      if (!response.ok) throw new Error("Error al obtener tecnologías");
      const data = await response.json();
      setTecnologias(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  const fetchProyectos = async () => {
    try {
      const res = await fetch("/api/proyectos");
      if (!res.ok) throw new Error("Error al obtener proyectos");
      const data = await res.json();
      setProyectos(Array.isArray(data) ? data : []);
    } catch (err) {
      setErrorProyectos(
        err instanceof Error ? err.message : "Error desconocido"
      );
    } finally {
      setLoadingProyectos(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await fetch("/api/roles");
      if (!response.ok) throw new Error("Error al obtener roles");
      const data = await response.json();
      setRoles(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

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
              rol={tech.rol}
              nombre={tech.nombre}
              icono={tech.icono}
              index={index}
              id={tech._id}
              descripcion={tech.descripcion}
              proyectos={tech.proyectos}
              onSuccess={fetchTecnologias}
              onEdit={(data) =>
                setEditTech({
                  _id: data.id,
                  nombre: data.nombre,
                  icono: data.icono,
                  descripcion: data.descripcion,
                  rol: data.rol,
                  proyectos: data.proyectos,
                })
              }
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
      {showForm && !loadingProyectos && !errorProyectos && (
        <CreateTechnologyForm
          onClose={() => setShowForm(false)}
          roles={roles}
          proyectos={proyectos}
          onSuccess={fetchTecnologias}
        />
      )}

      {showForm && loadingProyectos && (
        <p className="mt-4">Cargando proyectos...</p>
      )}
      {showForm && errorProyectos && (
        <p className="mt-4 text-red-500">Error: {errorProyectos}</p>
      )}

      {editTech && !loadingProyectos && !errorProyectos && (
        <EditTechnologyModal
          roles={roles}
          proyectos={proyectos}
          tech={editTech}
          onClose={() => setEditTech(null)}
          onSuccess={() => {
            setEditTech(null);
            fetchTecnologias();
          }}
        />
      )}

      {editTech && loadingProyectos && (
        <p className="mt-4">Cargando proyectos...</p>
      )}
      {editTech && errorProyectos && (
        <p className="mt-4 text-red-500">Error: {errorProyectos}</p>
      )}

      <Toaster />
    </div>
  );
}
