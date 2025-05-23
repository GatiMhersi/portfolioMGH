"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TecnologiaCard from "../components/TecnologiaCard";
import TechModal from "../components/TechModal"; // Asegurate de importar correctamente

interface Tecnologia {
  _id: string;
  nombre: string;
  icono: {
    url: string;
    public_id: string;
  };
  descripcion?: string;
  rol?: {
    _id: string; 
    nombre: string; 
    descripcion: string
  };
  proyectos?: {_id: string; slug: string}[]; // Array de IDs de proyectos relacionados
}

interface TecnologiasSectionProps {
  tecnologias: Tecnologia[];
}


export default function TecnologiasSection({ tecnologias }: Readonly<TecnologiasSectionProps>) {
  const [indiceRol, setIndiceRol] = useState(0);
  const tecnologiasAgrupadas = agruparTecnologiasPorRol(tecnologias);
const rolActual = tecnologiasAgrupadas[indiceRol];

  const [modalOpen, setModalOpen] = useState(false);
  const [tecnologiaSeleccionada, setTecnologiaSeleccionada] = useState<Tecnologia | null>(null);

  function agruparTecnologiasPorRol(tecnologias: Tecnologia[]) {
  const mapa = new Map<string, { rol: string; tecnologias: Tecnologia[] }>();

  tecnologias.forEach((tec) => {
    const rolNombre = tec.rol?.nombre || "Sin rol asignado";

    if (!mapa.has(rolNombre)) {
      mapa.set(rolNombre, { rol: rolNombre, tecnologias: [] });
    }

    mapa.get(rolNombre)?.tecnologias.push(tec);
  });

  return Array.from(mapa.values());
}


  const abrirModal = (tec: Tecnologia) => {
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
        ? (prev - 1 + tecnologiasAgrupadas.length) % tecnologiasAgrupadas.length
        : (prev + 1) % tecnologiasAgrupadas.length
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
                  icono={tec.icono.url}
                  onClick={() =>
                    abrirModal(tec)
                  }
                />
              ))}
            </div>
          </div>

          <p className="text-center text-sm text-white/70 mt-8">
            {indiceRol + 1} / {tecnologiasAgrupadas.length}
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
