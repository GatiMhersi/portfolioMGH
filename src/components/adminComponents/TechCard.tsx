'use client';
import Image from "next/image";
import { motion } from "framer-motion";

interface TechCardProps {
  nombre: string;
  icono: string;
  index: number;
  descripcion?: string;
}

export const TechCard: React.FC<TechCardProps> = ({ nombre, icono, index }) => {
  return (
    <motion.div
      className="bg-white shadow rounded-lg p-2 flex flex-col items-center justify-between text-center w-24 h-28 transform transition-transform duration-200 ease-out hover:scale-105"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: index * 0.1,
        duration: 0.5
      }}
    >
      <div className="relative w-8 h-8">
        <Image 
          src={`/icons/${icono}`} 
          alt={nombre}
          fill
          style={{ objectFit: 'contain' }}
          unoptimized={process.env.NODE_ENV !== 'production'}
        />
      </div>
      <h3 className="mt-2 text-xs font-semibold">{nombre}</h3>
    </motion.div>
  );
  };