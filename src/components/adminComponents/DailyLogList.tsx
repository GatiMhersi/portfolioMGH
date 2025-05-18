"use client";

import React from "react";
import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react"; // Importar íconos
import { toast } from "sonner";


type Tarea = {
  time: string;
  activity: string;
  project: string;
};

type DailyLog = {
  _id: string;
  fecha: string;
  tareas: Tarea[];
};

type Proyecto = {
  _id: string;
  titulo: string;
};

const DailyLogList = ({
  dailylogs,
  proyectos,
  onEditLog,
  onDeleteLog,
}: {
  dailylogs: DailyLog[];
  proyectos: Proyecto[];
  onEditLog: (log: DailyLog) => void;
  onDeleteLog: (id: string) => void;
}) => {
  const getTituloProyecto = (id: string) => {
    const proyecto = proyectos.find((p) => p._id === id);
    return proyecto ? proyecto.titulo : "Proyecto desconocido";
  };

  const eliminarLog = async (id: string) => {
  try {
    const res = await fetch(`/api/dailylogs/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Error al eliminar el log");
    }
    onDeleteLog(id);
    toast.success("🗑️ Log eliminado correctamente");
    // Opcionalmente, podrías actualizar la UI local aquí (por ejemplo, con un callback)
    console.log("Log eliminado correctamente");
  } catch (error) {
    console.error("Error al eliminar el log:", error);
  }
};


  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Registros Anteriores
      </h2>

      {dailylogs.length === 0 ? (
        <p className="text-center text-gray-500">
          No hay registros disponibles.
        </p>
      ) : (
        <div className="flex flex-1 overflow-x-auto overflow-y-hidden space-x-4 pb-4">
          {dailylogs.map((log, index) => (
            <motion.div
              key={log._id}
              className="relative min-w-[300px] min-h-full max-w-sm bg-white p-4 rounded shadow-md shrink-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: index * 0.2,
              }}
            >
              {/* Botones de acción */}
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  className="p-1 rounded hover:bg-gray-100 text-gray-600"
                  onClick={() => onEditLog(log)}
                >
                  <Pencil size={18} />
                </button>
                <button
                  className="p-1 rounded hover:bg-red-100 text-red-600"
                  onClick={() => eliminarLog(log._id)}
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <h3 className="font-bold mb-2">
                📅 {new Date(log.fecha).toLocaleDateString()}
              </h3>
              <ul className="space-y-2">
                {log.tareas.map((tarea, index) => (
                  <li key={index} className="text-sm text-gray-700">
                    <span className="font-medium">{tarea.time}</span> —{" "}
                    {tarea.activity}{" "}
                    <span className="italic text-gray-500">
                      ({getTituloProyecto(tarea.project)})
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DailyLogList;
