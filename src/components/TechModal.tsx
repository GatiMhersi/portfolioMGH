import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import React from "react";

type TechModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  proyectos?: string[];
};

const TechModal: React.FC<TechModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  proyectos = []
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 backdrop-blur-sm bg-gradient-to-b from-black/60 to-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div
              className="relative bg-white dark:bg-zinc-900 text-black dark:text-white max-w-lg w-full p-6 rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-zinc-600 hover:text-red-500"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-bold mb-2">{title}</h2>
              <p className="text-base">{description}</p>

              {/* Etiquetas de proyectos */}
              {proyectos.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold mb-2 text-sm text-zinc-500">Proyectos relacionados:</h3>
                  <div className="flex flex-wrap gap-2">
                    {proyectos.map((proyecto, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-white"
                      >
                        {proyecto}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TechModal;
