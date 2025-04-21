import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type LogItem = {
  time: string;
  activity: string;
  project: string;
};

type LogData = {
  [date: string]: LogItem[];
};

const logData: LogData = {
  "2025-04-20": [
    { time: "08:30", activity: "Revisión de commits", project: "Portfolio" },
    { time: "09:00", activity: "Diseño hero section", project: "Portfolio" },
    { time: "10:15", activity: "Ajuste de tipografías", project: "Portfolio" },
    {
      time: "11:30",
      activity: "Fix en formulario",
      project: "Ecommerce Joyas",
    },
    {
      time: "12:45",
      activity: "Optimización de imágenes",
      project: "Ecommerce Joyas",
    },
    { time: "14:00", activity: "Setup de Firebase", project: "Dashboard" },
    { time: "15:30", activity: "Deploy en Vercel", project: "Portfolio" },
    {
      time: "16:00",
      activity: "Corrección de bug mobile",
      project: "Landing Page",
    },
    { time: "17:15", activity: "Testing responsivo", project: "Portfolio" },
    {
      time: "18:00",
      activity: "Update de dependencias",
      project: "Panel Admin",
    },
  ],
  "2025-04-21": [
    { time: "09:00", activity: "Limpieza de código", project: "Panel Admin" },
    { time: "10:00", activity: "Pruebas unitarias", project: "Panel Admin" },
    {
      time: "11:15",
      activity: "Documentación de funciones",
      project: "Dashboard",
    },
    {
      time: "13:00",
      activity: "Integración de API",
      project: "Ecommerce Joyas",
    },
    {
      time: "14:00",
      activity: "Animaciones con Framer",
      project: "Landing Page",
    },
    { time: "15:30", activity: "Fix en navegación", project: "Landing Page" },
    { time: "16:00", activity: "Revisión de UI", project: "Portfolio" },
    { time: "17:00", activity: "Subida de producto", project: "Dashboard" },
    {
      time: "18:00",
      activity: "Reunión de seguimiento",
      project: "Panel Admin",
    },
    { time: "19:00", activity: "Backup de proyecto", project: "Portfolio" },
  ],
  "2025-04-22": [
    { time: "08:00", activity: "Diseño de tarjetas", project: "Landing Page" },
    { time: "09:30", activity: "Diseño del footer", project: "Portfolio" },
    { time: "10:30", activity: "Fix en login", project: "Dashboard" },
    {
      time: "11:45",
      activity: "Ajustes en checkout",
      project: "Ecommerce Joyas",
    },
    { time: "13:00", activity: "Subida a producción", project: "Panel Admin" },
    { time: "14:00", activity: "Animación de scroll", project: "Landing Page" },
    { time: "15:00", activity: "Creación de componente", project: "Portfolio" },
    { time: "16:30", activity: "Gestión de variantes", project: "Dashboard" },
    {
      time: "17:30",
      activity: "Actualización de estilos",
      project: "Panel Admin",
    },
    {
      time: "18:30",
      activity: "Pruebas de accesibilidad",
      project: "Landing Page",
    },
  ],
};

const availableDates: string[] = Object.keys(logData).sort();

const DailyLog: React.FC = () => {
  const [selectedDateIndex, setSelectedDateIndex] = useState<number>(0);
  const selectedDate = availableDates[selectedDateIndex];
  const logs: LogItem[] = logData[selectedDate] || [];

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

      {/* Transición con AnimatePresence */}
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
                exit={{ opacity: 0, y: -10 }}
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
                  animate={{ opacity: 1, x: 0 , transition:{
                    duration: 0.3,
                    delay: index * 0.08, // Delay escalonado
                    ease: "easeOut",
                  }}}
                  exit={{ opacity: 0, x: -20 ,transition:{
                    duration: 0.3,
                    delay: index * 0.08, // Delay escalonado
                    ease: "easeIn",
                  }}}
                  className="flex justify-between items-center bg-white/20 rounded-lg px-3 py-1 shadow-sm hover:bg-white/30 transition"
                >
                  <span className="text-white/80">{log.time}</span>
                  <span className="truncate flex-1 text-left ml-3">
                    {log.activity}
                  </span>
                  <span className="ml-3 text-yellow-300 font-medium">
                    {log.project}
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
