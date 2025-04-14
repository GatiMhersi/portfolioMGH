"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import TecnologiasSection from "@/components/TecnologiasSection";
import BitacoraSection from "@/components/BitacoraSection";
import SeccionBotonera from "@/components/SeccionBotonera";
import { proyectos } from "../proyectos/proyectos";

export default function ProyectosPage() {
  const [seccionActual, setSeccionActual] = useState("proyectos");

  const renderSeccion = () => {
    switch (seccionActual) {
      case "proyectos":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {proyectos.map((proyecto, index) => (
              <ProjectCard
                key={proyecto.slug}
                slug={proyecto.slug}
                titulo={proyecto.titulo}
                descripcion={proyecto.descripcion}
                imagen={proyecto.imagen}
                tecnologias={proyecto.tecnologias}
                index={index}
              />
            ))}
          </div>
        );
      case "tecnologias":
        return <TecnologiasSection />;
      case "bitacora":
        return <BitacoraSection />;
      default:
        return null;
    }
  };

  return (
    <section className="overflow-y-hidden h-screen px-6 py-20 bg-gradient-to-r from-[#0C0C0C] via-[#481E14] to-[#9B3922] text-white">
      <div className="h-full max-w-7xl mx-auto flex flex-col items-center justify-between">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#F2613F]"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {seccionActual === "proyectos"
            ? "Mis Proyectos"
            : seccionActual === "tecnologias"
            ? "Tecnologías"
            : "Bitácora"}
        </motion.h1>

        <SeccionBotonera
          seccionActual={seccionActual}
          setSeccionActual={setSeccionActual}
        />

        {renderSeccion()}
      </div>
    </section>
  );
}
