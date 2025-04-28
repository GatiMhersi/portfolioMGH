"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Main", href: "/dashboard" },
  { name: "Projects", href: "/dashboard/projects" },
  { name: "Roles", href: "/dashboard/roles" },
  { name: "Techs", href: "/dashboard/techs" },
  { name: "Daily", href: "/dashboard/daily" },
];

export default function AdminNavbar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-64 bg-gray-950 text-white flex flex-col p-4">
      <h2 className="text-2xl font-bold mb-6 text-orange-500">Admin Panel</h2>
      <nav className="flex flex-col gap-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const baseClasses =
            "rounded px-3 py-2 transition-colors text-sm font-medium";
          const activeClasses = "bg-orange-500 text-black";
          const inactiveClasses = "hover:bg-orange-500 hover:text-black text-gray-300";

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
