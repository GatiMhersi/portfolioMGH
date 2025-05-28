// app/contact/page.tsx

'use client';

import React from "react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-black px-4">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-orange-500 mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Contactos
      </motion.h1>

      <motion.div
        className="flex flex-col sm:flex-row gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        {/* Botón LinkedIn */}
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="https://www.linkedin.com/in/ghersinichmatias/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 px-8 py-4 rounded-md border-2 border-orange-700 text-orange-700 font-semibold hover:bg-orange-700 hover:text-black transition-colors duration-300"
          aria-label="LinkedIn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.22 8h4.55v12H.22V8zm7.16 0h4.36v1.64h.06c.61-1.15 2.1-2.37 4.32-2.37 4.62 0 5.48 3.05 5.48 7.01V20H16v-6.43c0-1.53-.03-3.5-2.13-3.5-2.13 0-2.46 1.67-2.46 3.4V20H7.38V8z" />
          </svg>
          LinkedIn
        </motion.a>

        {/* Botón GitHub */}
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="https://github.com/GatiMhersi"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 px-8 py-4 rounded-md border-2 border-orange-700 text-orange-700 font-semibold hover:bg-orange-700 hover:text-black transition-colors duration-300"
          aria-label="GitHub"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.11.82-.26.82-.577v-2.17c-3.338.724-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.807 1.304 3.492.997.108-.775.42-1.304.763-1.604-2.665-.305-5.466-1.334-5.466-5.933 0-1.31.468-2.38 1.236-3.22-.124-.304-.536-1.526.117-3.176 0 0 1.008-.322 3.3 1.23a11.48 11.48 0 0 1 3-.404c1.02.005 2.045.138 3 .404 2.29-1.553 3.296-1.23 3.296-1.23.655 1.65.243 2.872.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.804 5.625-5.476 5.92.43.37.823 1.096.823 2.21v3.28c0 .32.218.694.825.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
          GitHub
        </motion.a>
      </motion.div>
    </main>
  );
}
