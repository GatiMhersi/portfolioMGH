import { motion } from "framer-motion";
import { Pencil, Plus, Trash } from "lucide-react";

interface RoleCardProps {
  nombre: string;
  descripcion: string;
  delay: number;
  onEdit?: () => void;
  onCreate?: () => void;
  onDelete?: () => void;
  isCreateCard?: boolean;
}

export function RoleCard({
  nombre,
  descripcion,
  delay,
  onEdit,
  onCreate,
  onDelete,
  isCreateCard = false,
}: RoleCardProps) {
  const handleClick = () => {
    if (isCreateCard && onCreate) {
      onCreate();
    } else if (onEdit) {
      onEdit();
    }
  };

  return (
    <motion.div
      className={`p-6 rounded-lg shadow-md bg-white hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer relative ${
        isCreateCard ? "border-2 border-dashed border-blue-400 bg-blue-50" : ""
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">{nombre}</h2>
  
        {isCreateCard ? (
          <Plus className="text-blue-500" />
        ) : (
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.();
              }}
              className="cursor-pointer p-2 text-gray-500 rounded-full bg-amber-100 hover:bg-black hover:text-white transition-colors"
            >
              <Pencil size={20} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.();
              }}
              className="cursor-pointer p-2 text-red-500 rounded-full bg-red-100 hover:bg-black hover:text-red-700 transition-colors"
            >
              <Trash size={20} />
            </button>
          </div>
        )}
      </div>
  
      <p className="text-gray-600">{descripcion}</p>
    </motion.div>
  );
  }
