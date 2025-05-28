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
    if (isAnimating) {
      console.log("set isPageReady in false")
      setIsPageReady(false); // 🛡️ Activamos la barrera antes de cambiar el contenido
    }
  }, [isAnimating]);

  useEffect(() => {

    if (!isAnimating) {
      // 🛡️ Activamos la barrera antes de cambiar el contenido
      console.log("set isPageReady in true")
      setIsPageReady(true);
      console.log("set DisplayChildren in children")
      setDisplayChildren(children); // 🧩 Cargamos la nueva página
    }
  }, [children, pathname, isAnimating]);

  // Escuchamos los clics de navegación
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor || !anchor.href) return;

      const url = new URL(anchor.href);
      const destination = url.pathname;

      if (destination !== pathname && url.origin === window.location.origin) {
        console.log("set IsAnimating in true")
        setIsAnimating(true);
        console.log("set TrensitionKey in " + anchor.href)
        setTransitionKey(anchor.href);

        setTimeout(() => {
          console.log("End timeout")
          console.log("set IsAnimating in false")
          setIsAnimating(false);
        }, 500); // Duración de la animación de salida
      }
    };

    window.addEventListener("click", handleLinkClick);
    return () => window.removeEventListener("click", handleLinkClick);
  }, [pathname]);

  return (
    <div className="relative bg-[#0C0C0C] overflow-hidden">
      <AnimatePresence mode="wait">
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
      </AnimatePresence>
    </div>
  );
}
