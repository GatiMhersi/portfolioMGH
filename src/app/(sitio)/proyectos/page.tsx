"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import TecnologiasSection from "@/components/TecnologiasSection";
import SeccionBotonera from "@/components/SeccionBotonera";
import DailyLog from "@/components/DailyLog";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface DailyLogType {
  _id: string;
  fecha: string; // "YYYY-MM-DD"
  tareas: {
    time: string; // "08:30"
    activity: string; // "Fix en formulario"
    project: string;
  }[];
}

type TecnologiaTypeForProject = {
  nombre: string;
};

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
    descripcion: string;
  };
  proyectos?: { _id: string; slug: string }[]; // Array de IDs de proyectos relacionados
}

interface Proyecto {
  _id: string;
  slug: string;
  titulo: string;
  descripcion: string;
  imagen: { url: string; public_id: string };
  tecnologias: (string | TecnologiaTypeForProject)[];
}

export default function ProyectosPage() {
  const [seccionActual, setSeccionActual] = useState("proyectos");
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(true);
  const [tecnologias, setTecnologias] = useState<TecnologiaType[]>([]);
  const [dailyLogs, setDailyLogs] = useState<DailyLogType[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [proyectosPorPagina, setProyectosPorPagina] = useState(6);

  useEffect(() => {
    const actualizarCantidadPorPantalla = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setProyectosPorPagina(2); // pantallas pequeñas
      } else if (width < 1024) {
        setProyectosPorPagina(4); // pantallas medianas
      } else {
        setProyectosPorPagina(6); // pantallas grandes
      }
    };

    actualizarCantidadPorPantalla(); // inicial
    window.addEventListener("resize", actualizarCantidadPorPantalla); // al redimensionar

    return () =>
      window.removeEventListener("resize", actualizarCantidadPorPantalla);
  }, []);

  const totalPages = Math.ceil(proyectos.length / proyectosPorPagina);

  const startIndex = currentPage * proyectosPorPagina;
  const proyectosMostrados = proyectos.slice(
    startIndex,
    startIndex + proyectosPorPagina
  );

  const handleAnterior = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleSiguiente = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

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
        console.log(data);
      } catch (error) {
        console.error("Error al obtener tecnologías:", error);
      }
    };

    fetchTecnologias();
  }, []);

  useEffect(() => {
    const fetchDailyLogs = async () => {
      try {
        const res = await fetch("/api/dailylogs");
        if (!res.ok) throw new Error("Error al obtener dailyLogs");
        const data = await res.json();
        setDailyLogs(data);
        console.log("DailyLogs:", data);
      } catch (error) {
        console.error("Error al obtener dailyLogs:", error);
      }
    };

    fetchDailyLogs();
  }, []);

  const renderSeccion = () => {
    switch (seccionActual) {
      case "proyectos":
        if (loading) return <p>Cargando proyectos...</p>;

        return (
          <div className="w-screen px-10">
                        {/* Controles de paginación */}
            <div className="flex justify-center items-center gap-4 mb-8">
              <button
                onClick={handleAnterior}
                disabled={currentPage === 0}
                className="px-4 py-2 text-black bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                <ArrowLeft />
              </button>
              <span className="text-white">
                Página {currentPage + 1} de {totalPages}
              </span>
              <button
                onClick={handleSiguiente}
                disabled={currentPage === totalPages - 1}
                className="px-4 py-2 text-black bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                <ArrowRight />
              </button>
            </div>

            {/* Grid de proyectos */}
            <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {proyectosMostrados.map((proyecto, index) => (
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

          </div>
        );
      case "tecnologias":
        return <TecnologiasSection tecnologias={tecnologias} />;

      case "bitacora":
        return <DailyLog data={dailyLogs} proyectos={proyectos} />;

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
    <section key={"proyectos"} className="overflow-y-hidden h-screen px-6 py-10 pt-32 md:py-20 bg-gradient-to-r from-[#0C0C0C] via-[#481E14] to-[#9B3922] text-white">
      <div className="h-full max-w-7xl mx-auto flex flex-col items-center justify-start">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center mb-2 text-[#F2613F]"
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
