"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import ConfirmDeleteModal from "@/components/adminComponents/ConfirmDeleteProjectModal";


type ProjectCardProps = {
  titulo: string;
  imagen?: { url: string; public_id: string };
  index?: number;
  id: string;
  onEdit?: () => void;
  onDeleted?: () => void; // función para actualizar la lista desde page.tsx
};

export default function ProjectCard({
  titulo,
  imagen,
  index = 0,
  id,
  onEdit,
  onDeleted,
}: ProjectCardProps) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleClickDelete = () => setShowModal(true);

  const handleDelete = async () => {

    try {
      setLoading(true);

      // Paso 3: Eliminar imagen en Cloudinary
      if (imagen?.public_id) {
        const imageRes = await fetch("/api/images/delete", {
          method: "DELETE",
          body: JSON.stringify({ public_id: imagen.public_id }),
        });

        if (!imageRes.ok) {
          throw new Error("No se pudo eliminar la imagen");
        }
      }

      // Paso 4: Eliminar proyecto de la base de datos
      const res = await fetch(`/api/proyectos/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Error eliminando el proyecto");
      }

      toast.success("Proyecto eliminado correctamente");

      // Paso 5: Actualizar listado en page.tsx
      onDeleted?.();
    } catch (error) {
        console.error(error)
      toast.error("Ocurrió un error al eliminar el proyecto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.1 }}
      className="bg-white rounded shadow p-4 hover:shadow-md transition relative"
    >
      <h2 className="text-xl font-semibold text-gray-800">{titulo}</h2>

      {imagen && (
        <div className="relative w-full h-40 mt-2 rounded overflow-hidden">
          <Image src={imagen.url} alt={titulo} fill className="object-cover" />
        </div>
      )}

      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={onEdit}
          className="text-blue-600 hover:text-blue-800 transition"
          title="Editar proyecto"
        >
          <Edit className="w-5 h-5" />
        </button>
        <button
          onClick={handleClickDelete}
          disabled={loading}
          className="text-red-600 hover:text-red-800 transition"
          title="Eliminar proyecto"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
      <ConfirmDeleteModal
  open={showModal}
  onClose={() => setShowModal(false)}
  onConfirm={handleDelete}
  loading={loading}
/>
    </motion.div>
  );
}
