"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Contacto", href: "/contacto" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string
  ) => {
    e.preventDefault();
    setTimeout(() => {
      router.push(href);
    }, 500);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 px-6 py-4 backdrop-blur-lg bg-white/10 border-b border-white/20 shadow-sm"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-2 items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-[#F2613F]">
          MatiGhersiDev
        </Link>
        <ul className="flex gap-6 text-sm md:text-base font-medium text-white">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <li
                key={item.href}
                className={`text-center transition-colors duration-300 md:border-none border-[1px] py-1 px-2 rounded-2xl w-24
                  ${isActive ? "bg-[#F2613F] text-white" : "hover:text-[#F2613F]"}`}
              >
                <Link
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.nav>
  );
}
