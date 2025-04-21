"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { tecnologiasPorRol } from "../app/proyectos/tecnologias";
import TecnologiaCard from "../components/TecnologiaCard";
import TechModal from "../components/TechModal"; // Asegurate de importar correctamente

export default function TecnologiasSection() {
  const [indiceRol, setIndiceRol] = useState(0);
  const rolActual = tecnologiasPorRol[indiceRol];

  const [modalOpen, setModalOpen] = useState(false);
  const [tecnologiaSeleccionada, setTecnologiaSeleccionada] = useState<{
    nombre: string;
    descripcion: string;
    proyectos: string[];
  } | null>(null);

  const abrirModal = (tec: { nombre: string; descripcion: string; proyectos: string[]}) => {
    setTecnologiaSeleccionada(tec);
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setModalOpen(false);
    setTecnologiaSeleccionada(null);
  };

  const cambiarRol = (direccion: "anterior" | "siguiente") => {
    setIndiceRol((prev) =>
      direccion === "anterior"
        ? (prev - 1 + tecnologiasPorRol.length) % tecnologiasPorRol.length
        : (prev + 1) % tecnologiasPorRol.length
    );
  };

  return (
    <section className="h-full w-1/2 flex items-center justify-center relative px-4">
      {/* Botón Izquierda */}
      <button
        onClick={() => cambiarRol("anterior")}
        className="absolute -left-10 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/20 hover:bg-white/30 rounded-full"
      >
        <ChevronLeft size={32} className="text-white" />
      </button>

      {/* Card del Rol */}
      <AnimatePresence mode="wait">
        <motion.div
          key={rolActual.rol}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full h-full max-w-4xl flex flex-col justify-between shadow-xl"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#F2613F] mb-6">
              {rolActual.rol}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-items-center">
              {rolActual.tecnologias.map((tec) => (
                <TecnologiaCard
                  key={tec.nombre}
                  nombre={tec.nombre}
                  icono={tec.icono}
                  onClick={() =>
                    abrirModal({ nombre: tec.nombre, descripcion: tec.description, proyectos:tec.proyectos })
                  }
                />
              ))}
            </div>
          </div>

          <p className="text-center text-sm text-white/70 mt-8">
            {indiceRol + 1} / {tecnologiasPorRol.length}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Botón Derecha */}
      <button
        onClick={() => cambiarRol("siguiente")}
        className="absolute -right-10 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/20 hover:bg-white/30 rounded-full"
      >
        <ChevronRight size={32} className="text-white" />
      </button>

      {/* Modal flotante */}
      <TechModal
        isOpen={modalOpen}
        onClose={cerrarModal}
        title={tecnologiaSeleccionada?.nombre || ""}
        description={tecnologiaSeleccionada?.descripcion || ""}
        proyectos={tecnologiaSeleccionada?.proyectos || []}
      />
    </section>
  );
}
