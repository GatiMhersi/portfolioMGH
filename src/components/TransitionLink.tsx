"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface CustomLinkProps {
  href: string;
  children: ReactNode;
  delay?: number; // en ms
}

export default function CustomLink({ href, children, delay = 300 }: CustomLinkProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // Opcional: activar un overlay global o animación aquí
    const overlay = document.getElementById("transition-overlay");
    if (overlay) {
      overlay.classList.remove("opacity-0");
      overlay.classList.add("opacity-100");
    }

    setTimeout(() => {
      router.push(href);
    }, delay);
  };

  return (
    <a href={href} onClick={handleClick}>
      {children}
    </a>
  );
}
