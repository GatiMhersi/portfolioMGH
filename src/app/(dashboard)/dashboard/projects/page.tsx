// app/dashboard/projects/page.tsx
"use client";

import { useEffect, useState } from "react";
import ProjectCard from "@/components/adminComponents/ProjectCard"; // Ajusta la ruta si es necesario
import ProyectoForm from "@/components/adminComponents/ProjectForm";

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

export default function ProjectsPage() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(true);
  const [tecnologias, setTecnologias] = useState<Tecnologia[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTecnologias = async () => {
      try {
        const res = await fetch("/api/tecnologias");
        if (!res.ok) throw new Error("Error al obtener tecnologías");
        const data = await res.json();
        setTecnologias(data);
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

    fetchTecnologias();
  }, []);

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

  useEffect(() => {
    fetchProyectos();
  }, []);

  const handleProyectoCreado = (nuevoProyecto: Proyecto) => {
  setProyectos((prev) => [...prev, nuevoProyecto]);
  setShowForm(false); // opcional: cerrar el modal
};

  if (loading) return <p className="text-gray-600">Cargando proyectos...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">Proyectos</h1>
      {proyectos.length === 0 ? (
        <p className="text-gray-500">No hay proyectos cargados.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {proyectos.map((proyecto, index) => (
            <li key={proyecto._id}>
              <ProjectCard
                id={proyecto._id}
                titulo={proyecto.titulo}
                imagen={proyecto.imagen}
                index={index}
                onDeleted={fetchProyectos}
              />
            </li>
          ))}
        </ul>
      )}
      <div className="absolute">
        <button
          onClick={() => setShowForm(true)}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 shadow-lg"
        >
          Nuevo Proyecto
        </button>
      </div>

      {showForm && (
        <div className="absolute top-0 left-0">
          <ProyectoForm
            tecnologiasDisponibles={tecnologias}
            onClose={() => setShowForm(false)}
            onProyectoCreado={handleProyectoCreado}
          />
        </div>
      )}
    </section>
  );
}
