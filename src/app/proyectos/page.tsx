"use client";

import { motion } from "motion/react";
import ProjectCard from "@/components/ProjectCard";
import { proyectos } from "../proyectos/proyectos";

export default function ProyectosPage() {
  return (
    <section className="min-h-screen px-6 py-20 bg-gradient-to-r from-[#0C0C0C] via-[#481E14] to-[#9B3922] text-white">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#F2613F]"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Mis Proyectos
        </motion.h1>

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
      </div>
    </section>
  );
}
