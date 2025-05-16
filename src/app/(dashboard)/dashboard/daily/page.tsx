"use client";

import React, { useEffect, useState } from "react";
import NewDailyLogForm from "@/components/adminComponents/NewDailyLogForm";
import DailyLogList from "@/components/adminComponents/DailyLogList";
import { Toaster } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const DaliPage = () => {
  const [proyectos, setProyectos] = useState([]);
  const [dailylogs, setDailylogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [proyectosRes, dailylogsRes] = await Promise.all([
          fetch("/api/proyectos"),
          fetch("/api/dailylogs"),
        ]);

        if (!proyectosRes.ok || !dailylogsRes.ok) {
          throw new Error("Error al cargar datos");
        }

        const proyectosData = await proyectosRes.json();
        const dailylogsData = await dailylogsRes.json();

        setProyectos(proyectosData);
        setDailylogs(dailylogsData);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Ocurrió un error desconocido");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="w-full h-full p-6 bg-gray-50 relative overflow-hidden">
      <motion.section
        className="flex flex-col h-full space-y-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-4xl font-bold text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Registro Diario de Actividades
        </motion.h1>

        {loading && <p className="text-center">Cargando datos...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <>
            {/* Botón flotante */}
            <motion.button
              onClick={() => setShowForm(true)}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              + Nuevo Registro
            </motion.button>

            {/* Modal */}
            <AnimatePresence>
              {showForm && (
                <motion.div
                  className="fixed inset-0 bg-black/50 h-screen flex items-center justify-center z-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="relative"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <NewDailyLogForm proyectos={proyectos} />
                    <button
                      onClick={() => setShowForm(false)}
                      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
                      title="Cerrar"
                    >
                      ✖
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Lista */}
            <motion.div
              className="flex-1 pb-28 flex overflow-hidden"
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <DailyLogList dailylogs={dailylogs} proyectos={proyectos} />
            </motion.div>
          </>
        )}
      </motion.section>

      <Toaster position="bottom-right" richColors />
    </main>
  );
};

export default DaliPage;
