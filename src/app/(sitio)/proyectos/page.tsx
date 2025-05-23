"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import TecnologiasSection from "@/components/TecnologiasSection";
import SeccionBotonera from "@/components/SeccionBotonera";
import DailyLog from "@/components/DailyLog";

type TecnologiaTypeForProject = {
  nombre: string
}

interface TecnologiaType {
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
  slug: string;
  titulo: string;
  descripcion: string;
  imagen: { url: string; public_id: string };
  tecnologias: (string | TecnologiaTypeForProject)[]
}

export default function ProyectosPage() {
  const [seccionActual, setSeccionActual] = useState("proyectos");
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(true);
  const [tecnologias, setTecnologias] = useState<TecnologiaType[]>([]);


  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const res = await fetch("/api/proyectos");
        const data = await res.json();
        setProyectos(data);
      } catch (error) {
        console.error("Error al obtener proyectos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProyectos();
  }, []);

  useEffect(() => {
  const fetchTecnologias = async () => {
    try {
      const res = await fetch("/api/tecnologias");
      if (!res.ok) throw new Error("Error al obtener tecnologías");
      const data = await res.json();
      setTecnologias(data);
      console.log(data)
    } catch (error) {
      console.error("Error al obtener tecnologías:", error);
    }
  };

  fetchTecnologias();
}, []);


  const renderSeccion = () => {
    switch (seccionActual) {
      case "proyectos":
        if (loading) return <p>Cargando proyectos...</p>;

        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {proyectos.map((proyecto, index) => (
              <ProjectCard
                key={proyecto.slug}
                slug={proyecto.slug}
                titulo={proyecto.titulo}
                descripcion={proyecto.descripcion}
                imagen={proyecto.imagen.url}
                tecnologias={
                  Array.isArray(proyecto.tecnologias)
                    ? proyecto.tecnologias.map((t) =>
                        typeof t === "string" ? t : t.nombre
                      )
                    : []
                }
                index={index}
              />
            ))}
          </div>
        );
      case "tecnologias":
  return <TecnologiasSection tecnologias={tecnologias} />;

      case "bitacora":
        return <DailyLog />;
      default:
        return null;
    }
  };

  let tituloSeccion = "";

switch (seccionActual) {
  case "proyectos":
    tituloSeccion = "Mis Proyectos";
    break;
  case "tecnologias":
    tituloSeccion = "Tecnologías";
    break;
  default:
    tituloSeccion = "Bitácora";
}

  return (
    <section className="overflow-y-hidden h-screen px-6 py-20 bg-gradient-to-r from-[#0C0C0C] via-[#481E14] to-[#9B3922] text-white">
      <div className="h-full max-w-7xl mx-auto flex flex-col items-center justify-start">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#F2613F]"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {tituloSeccion}
          <SeccionBotonera
          seccionActual={seccionActual}
          setSeccionActual={setSeccionActual}
        />
        </motion.h1>

        

        {renderSeccion()}
      </div>
    </section>
  );
}
