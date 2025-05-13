"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EditRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  roleId: string;
  initialRoleName: string;
  initialRoleDescription: string;
  onSuccess: () => void; // para refrescar roles o mostrar success
}

export function EditRoleModal({
  isOpen,
  onClose,
  roleId,
  initialRoleName,
  initialRoleDescription,
  onSuccess,
}: Readonly<EditRoleModalProps>) {
  const [name, setName] = useState(initialRoleName);
  const [description, setDescription] = useState(initialRoleDescription);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/roles/${roleId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: name,
          descripcion: description,
        }),
      });

      if (!res.ok) {
        throw new Error("Error al actualizar el rol");
      }

      onSuccess(); // callback para que el padre sepa que actualizamos
      onClose();   // cerramos el modal
    } catch (err) {
      setError("Hubo un problema al guardar los cambios.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>

            <h2 className="text-2xl font-bold mb-4">Editar Rol</h2>

            {error && (
              <p className="text-red-500 text-sm mb-2">{error}</p>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Nombre</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Descripción</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
