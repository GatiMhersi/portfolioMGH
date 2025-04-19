"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function PageTransitionWrapper({
  children,
}: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname();

  const [displayChildren, setDisplayChildren] = useState(children);
  const [isAnimating, setIsAnimating] = useState(false);
  const [transitionKey, setTransitionKey] = useState<string>(pathname);
  const [isPageReady, setIsPageReady] = useState(true);

  // Cuando cambian los children y no estamos animando, se actualiza el contenido
  useEffect(() => {
    if (!isAnimating) {
      setIsPageReady(false); // 🛡️ Activamos la barrera antes de cambiar el contenido

      /* requestAnimationFrame(() => {
        setIsPageReady(true); // ✅ Quitamos la barrera una vez renderizado
      }); */
    }
  }, [isAnimating]);

  useEffect(() => {
    if (!isAnimating) {
      // 🛡️ Activamos la barrera antes de cambiar el contenido
      setIsPageReady(true);
      setDisplayChildren(children); // 🧩 Cargamos la nueva página
    }
  }, [children, pathname]);

  // Escuchamos los clics de navegación
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor || !anchor.href) return;

      const url = new URL(anchor.href);
      const destination = url.pathname;

      if (destination !== pathname && url.origin === window.location.origin) {
        setIsAnimating(true);
        setTransitionKey(anchor.href);

        setTimeout(() => {
          setIsAnimating(false);
        }, 500); // Duración de la animación de salida
      }
    };

    window.addEventListener("click", handleLinkClick);
    return () => window.removeEventListener("click", handleLinkClick);
  }, [pathname]);

  return (
    <div className="relative bg-[#0C0C0C] overflow-hidden">
      {/* Barrera visual negra mientras la página no está lista */}
      {/* {!isPageReady && <div className="fixed inset-0 bg-[#0C0C0C] z-40" />} */}

      <AnimatePresence mode="wait">
        {/* {!isPageReady && (
        <div className="fixed inset-0 bg-[#0C0C0C] z-40" />
      )} */}
        <motion.div
          key={transitionKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {!isPageReady && (
            <div className="fixed inset-0 bg-[#0C0C0C] z-40 pointer-events-none" />
          )}
          {displayChildren}
        </motion.div>

        {/* <motion.div
          key={transitionKey}
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {!isPageReady && (
            <div className="fixed inset-0 bg-[#0C0C0C] z-40 pointer-events-none" />
          )}
          {displayChildren}
        </motion.div> */}

        {/* <motion.div
          key={transitionKey}
          initial={{
            opacity: 0,
            rotateY: -90,
            transformPerspective: 1000, // importante para el efecto 3D
          }}
          animate={{
            opacity: 1,
            rotateY: 0,
            transformPerspective: 1000,
          }}
          exit={{
            opacity: 0,
            rotateY: 90,
            transformPerspective: 1000,
          }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
          className="relative"
        >
          {!isPageReady && (
            <div className="fixed inset-0 bg-[#0C0C0C] z-40 pointer-events-none" />
          )}

          {displayChildren}
        </motion.div> */}
      </AnimatePresence>
    </div>
  );
}
