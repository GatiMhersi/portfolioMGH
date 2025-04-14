"use client";

import { motion, AnimatePresence } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function PageTransitionWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [displayChildren, setDisplayChildren] = useState(children);
  const [isAnimating, setIsAnimating] = useState(false);
  const [nextRoute, setNextRoute] = useState<string | null>(null);

  useEffect(() => {
    if (!isAnimating) {
      setDisplayChildren(children);
    }
  }, [children, isAnimating]);

  useEffect(() => {
    const handleLinkClick = (e: any) => {
      const anchor = e.target.closest("a");
      if (!anchor || !anchor.href) return;

      const url = new URL(anchor.href);
      const destination = url.pathname;

      if (destination !== pathname) {
        e.preventDefault();
        setIsAnimating(true);
        setNextRoute(destination);
      }
    };

    window.addEventListener("click", handleLinkClick);

    return () => {
      window.removeEventListener("click", handleLinkClick);
    };
  }, [pathname]);

  const handleExitComplete = () => {
    if (nextRoute) {
      router.push(nextRoute);
      setNextRoute(null);
    }
    setIsAnimating(false);
  };

  return (
    <div className="bg-black">
    <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
      <motion.div
        key={isAnimating ? "transitioning" : pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {displayChildren}
      </motion.div>
    </AnimatePresence>
    </div>
  );
}
