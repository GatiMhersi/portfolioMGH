import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

// Interfaz que vos definiste
export interface DailyLogType {
  _id: string;
  fecha: string; // "YYYY-MM-DD"
  tareas: {
    time: string;
    activity: string;
    project: string;
  }[];
}

interface Proyecto {
  _id: string;
  slug: string;
  titulo: string;
  descripcion: string;
  imagen: { url: string; public_id: string };
  tecnologias: (string | { nombre: string })[];
}

interface DailyLogProps {
  data: DailyLogType[];
  proyectos: Proyecto[];
}

const DailyLog: React.FC<DailyLogProps> = ({ data, proyectos }) => {
  const [selectedDateIndex, setSelectedDateIndex] = useState<number>(0);

  const sortedData = [...data].sort((a, b) => a.fecha.localeCompare(b.fecha));
  const availableDates = sortedData.map((entry) => entry.fecha);
  const selectedDate = availableDates[selectedDateIndex];
  const logs = sortedData[selectedDateIndex]?.tareas || [];

  const getProjectTitleById = (id: string) => {
  const found = proyectos.find((p) => p._id === id);
  return found ? (found.titulo || found.slug ) : id;
};


  const cambiarDia = (direccion: "anterior" | "siguiente") => {
    setSelectedDateIndex((prev) => {
      if (direccion === "anterior" && prev > 0) return prev - 1;
      if (direccion === "siguiente" && prev < availableDates.length - 1)
        return prev + 1;
      return prev;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative z-10 bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-1/2 h-full flex flex-col justify-between shadow-xl"
    >
      {/* Flechas */}
      {selectedDateIndex > 0 && (
        <button
          onClick={() => cambiarDia("anterior")}
          className="absolute -left-20 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/20 hover:bg-white/30 rounded-full"
        >
          <ChevronLeft size={32} className="text-white" />
        </button>
      )}
      {selectedDateIndex < availableDates.length - 1 && (
        <button
          onClick={() => cambiarDia("siguiente")}
          className="absolute -right-20 top-1/2 -translate-y-1/2 z-50 p-2 bg-white/20 hover:bg-white/30 rounded-full"
        >
          <ChevronRight size={32} className="text-white" />
        </button>
      )}

      <div className="mb-4">
        <h2 className="text-2xl font-bold text-white mb-2">
          🗓️ Actividades del día
        </h2>
        <select
          value={selectedDate}
          onChange={(e) =>
            setSelectedDateIndex(availableDates.indexOf(e.target.value))
          }
          className="bg-white/20 text-white px-3 py-2 rounded-lg backdrop-blur-md"
        >
          {availableDates.map((date) => (
            <option key={date} value={date} className="text-black">
              {new Date(date).toLocaleDateString()}
            </option>
          ))}
        </select>
      </div>

      <div className="relative h-full min-h-full overflow-x-hidden">
        <AnimatePresence mode="wait" propagate>
          <ul
            key={selectedDate}
            className="absolute top-0 left-0 right-0 space-y-1 text-sm font-mono overflow-x-hidden overflow-y-hidden pr-1 text-white origin-top transform-gpu"
          >
            <AnimatePresence mode="wait" propagate>
              {logs.length === 0 ? (
                <motion.li
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -100 }}
                  transition={{ duration: 0.4 }}
                  className="text-gray-300"
                >
                  No hay actividades registradas.
                </motion.li>
              ) : (
                logs.map((log, index) => (
                  <motion.li
                    key={log.time + log.activity + log.project}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: {
                        duration: 0.3,
                        delay: index * 0.08,
                        ease: "easeOut",
                      },
                    }}
                    exit={{
                      opacity: 0,
                      x: -200,
                      transition: {
                        duration: 0.3,
                        delay: index * 0.08,
                        ease: "easeIn",
                      },
                    }}
                    className="flex justify-between items-center bg-white/20 rounded-lg px-3 py-1 shadow-sm hover:bg-white/30 transition"
                  >
                    <span className="text-white/80">{log.time}</span>
                    <span className="truncate flex-1 text-left ml-3">
                      {log.activity}
                    </span>
                    <span className="ml-3 text-yellow-300 font-medium">
                      {getProjectTitleById(log.project)}
                    </span>
                  </motion.li>
                ))
              )}
            </AnimatePresence>
          </ul>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default DailyLog;
