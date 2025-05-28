"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      className="min-h-screen flex flex-col md:flex-row justify-center items-center text-center px-6 
        bg-gradient-to-l from-[#0C0C0C] via-[#481E14] to-[#9B3922] animate-pulse-glow"
    >
      {/* Contenedor del texto y la imagen */}
      <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
        {/* Imagen */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="drop-shadow-2xl drop-shadow-orange-700 w-64 h-64 md:w-80 md:h-auto"
        >
          <div className="relative m-auto md:w-80 md:h-80 h-64 w-64">
            <Image
              src="/avatar.png"
              alt="Imagen de Matías"
              fill
              className="object-contain"
              sizes="(max-width: 256px) 100vw, 192px"
              priority
            />
          </div>
        </motion.div>
        {/* Texto */}
        <div className="text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-extrabold text-[#F2613F]"
          >
            Hola, soy{" "}
            <span className="text-[#9B3922] drop-shadow-sm">Matías</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-4 text-lg md:text-xl text-gray-300 max-w-xl"
          >
            Desarrollador Web creando experiencias digitales con estilo,
            funcionalidad y detalle.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-8"
          >
            <Link
              href="/proyectos"
              className="border-solid border-black border-2 drop-shadow-sm inline-block px-6 py-3 text-white bg-[#481E14] rounded-full hover:bg-[#9B3922] transition animate-pulse-button"
            >
              Ver proyectos
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
