// components/SeccionBotonera.tsx
import React from "react";

interface SeccionBotoneraProps {
  seccionActual: string;
  setSeccionActual: (seccion: string) => void;
  deshabilitado: boolean;
}

const botones = [
  { id: "proyectos", label: "Mis Proyectos" },
  { id: "tecnologias", label: "Tecnologías" },
  { id: "bitacora", label: "Bitácora" },
];

export default function SeccionBotonera({
  seccionActual,
  setSeccionActual,
  deshabilitado,
}: Readonly<SeccionBotoneraProps>) {
  return (
    <div className="flex text-base mt-3 justify-center gap-4 mb-10 flex-wrap">
      {botones.map(({ id, label }) => (
        <button
          key={id}
          disabled={deshabilitado}
          onClick={() => setSeccionActual(id)}
          className={`cursor-pointer hover:bg-orange-200 px-4 py-2 rounded-full transition duration-300 ${
            seccionActual === id
              ? "bg-[#F2613F] text-white"
              : "bg-white text-black"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
