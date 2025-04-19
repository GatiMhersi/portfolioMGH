// app/proyectos/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import { proyectos } from "../proyectos";

// Simulación de base de datos o importación externa

export default async function ProyectoPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const proyecto = proyectos.find((p) => p.slug === slug);

  if (!proyecto) return notFound();

  return (
    <section className="min-h-screen px-6 py-12 bg-[#0C0C0C] text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#F2613F] mb-4">
          {proyecto.titulo}
        </h1>

        <p className="text-gray-300 text-lg mb-6">{proyecto.descripcion}</p>

        <div className="w-full h-64 relative rounded-lg overflow-hidden mb-6">
          <Image
            src={proyecto.imagen}
            alt={proyecto.titulo}
            fill
            className="object-cover"
            sizes="(max-width: 256px) 100vw, 192px"
            priority
          />
        </div>

        <p className="text-gray-400 text-md mb-6 leading-relaxed">
          {proyecto.detalles}
        </p>

        <h2 className="text-xl font-semibold text-[#9B3922] mb-2">
          Tecnologías utilizadas:
        </h2>
        <ul className="flex flex-wrap gap-2">
          {proyecto.tecnologias.map((tec, index) => (
            <li
              key={index}
              className="bg-[#481E14] text-sm px-3 py-1 rounded-full text-white"
            >
              {tec}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
