'use client';
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface TechCardProps {
  id: string;
  nombre: string;
  icono: {
    url: string;
    public_id: string;
  };
  index: number;
  descripcion?: string;
  rol?: string;
  proyectos?: string[]
  onSuccess: () => void;
  onEdit: (tech: { id: string; nombre: string; icono: any; descripcion?: string; rol?: string; proyectos?: string[] }) => void;
}

export const TechCard: React.FC<TechCardProps> = ({ nombre, icono, index, id, descripcion, proyectos, rol, onSuccess, onEdit }: TechCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  

  const handleDelete = async () => {
  try {
    await fetch(`/api/tecnologias/${id}`, {
      method: 'DELETE',
    });
    onSuccess(); // Refresca la lista actual
    toast.success("Tecnología creada exitosamente");
  } catch (error) {
    console.error("Error eliminando la tecnología:", error);
    toast.error("Ocurrió un error al crear la tecnología");
  }
};


  return (
    <motion.div
      className="relative w-24 h-28 perspective"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 20,
        delay: index * 0.1,
        duration: 0.5
      }}
      onClick={() => setIsFlipped(prev => !prev)}
    >
      <div className="w-full h-full relative">
        <motion.div
          className="absolute w-full cursor-pointer h-full rounded-lg shadow bg-red-300 p-2 flex flex-col items-center justify-center text-center backface-hidden rotate-y-180"
          animate={{ rotateY: isFlipped ? 0 : -180 }}
          transition={{ duration: 0.6 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <h3 className="text-sm font-semibold mb-2">{nombre}</h3>
          <div className="flex gap-2">
            <button className="cursor-pointer transition-all p-1 rounded hover:bg-orange-400" onClick={(e) => {
    e.stopPropagation(); // previene el flip
    onEdit({ id, nombre, icono, descripcion, rol, proyectos });
  }}>
              <Pencil size={16} />
            </button>
            <button className="cursor-pointer transition-all p-1 rounded hover:bg-red-800 hover:text-white"
             onClick={(e) => {
              e.stopPropagation(); // Previene el flip al hacer click en eliminar
              handleDelete();
            }}>
              <Trash2 size={16} />
            </button>
          </div>
        </motion.div>
        <motion.div
          className="absolute cursor-pointer w-full h-full rounded-lg shadow bg-white p-2 flex flex-col items-center justify-center text-center backface-hidden"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="relative w-8 h-8">
            <Image
              src={icono.url}
              alt={nombre}
              fill
              style={{ objectFit: 'contain' }}
              unoptimized={process.env.NODE_ENV !== 'production'}
            />
          </div>
          <h3 className="mt-2 text-xs font-semibold">{nombre}</h3>
        </motion.div>

        
      </div>
    </motion.div>
  );
};
