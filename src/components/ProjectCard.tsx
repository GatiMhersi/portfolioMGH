// components/ProjectCard.tsx
"use client";

import { motion } from "motion/react";

import CustomLink from "./TransitionLink";

interface ProjectCardProps {
  slug: string;
  titulo: string;
  descripcion: string;
  imagen: string;
  tecnologias?: string[];
  index?: number;
}


export default function ProjectCard({
  slug,
  titulo,
  descripcion,
  imagen,
  tecnologias = [],
  index = 0,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.2,
        ease: "easeOut",
      }}
    >
      <CustomLink href={`/proyectos/${slug}`}>
      <div className="bg-[#1A1A1A] rounded-lg shadow-lg overflow-hidden 
  transition-all duration-300 transform 
  opacity-70 hover:opacity-100 hover:scale-105 
  hover:brightness-110 hover:shadow-xl">
          <div className="relative">
            <img
              src={imagen}
              alt={titulo}
              className="w-full h-48 object-cover"
            />

            {tecnologias.length > 0 && (
              <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-2 bg-black/60 backdrop-blur-sm p-1 rounded-md">
                {tecnologias.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs bg-[#F2613F] text-black font-semibold px-2 py-0.5 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="p-4">
            <h2 className="text-xl font-semibold text-[#F2613F]">{titulo}</h2>
            <p className="text-sm text-gray-300 mt-2">{descripcion}</p>
          </div>
        </div>
      </CustomLink>
    </motion.div>
  );
}
