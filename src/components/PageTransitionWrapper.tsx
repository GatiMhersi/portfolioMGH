"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function PageTransitionWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const [displayChildren, setDisplayChildren] = useState(children);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!isAnimating) {
      setDisplayChildren(children);
    }
  }, [children, isAnimating]);

  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor || !anchor.href) return;

      const url = new URL(anchor.href);
      const destination = url.pathname;

      if (destination !== pathname && url.origin === window.location.origin) {
        setIsAnimating(true);

        // Dejamos que otro componente maneje el push
        setTimeout(() => {
          setIsAnimating(false);
        }, 500); // Duración de la animación de salida
      }
    };

    window.addEventListener("click", handleLinkClick);
    return () => window.removeEventListener("click", handleLinkClick);
  }, [pathname]);

  return (
    <div className="bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={isAnimating ? "transitioning" : pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }} // Animación de salida de 2 segundos
        >
          {displayChildren}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
