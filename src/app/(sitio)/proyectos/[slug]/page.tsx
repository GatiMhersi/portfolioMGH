// app/proyectos/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Proyecto from "@/models/Proyecto";
import "@/models/Tecnologia"; // para registrar el modelo
import { connectToDatabase } from "@/lib/mongodb";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw"; // solo si quieres permitir HTML en el markdown
import { markdownComponents } from "@/lib/MarkdownComponents";

// Generador de rutas estáticas en build time
export async function generateStaticParams() {
  await connectToDatabase();
  const proyectos = await Proyecto.find({}, "slug"); // solo traemos los slugs
  return proyectos.map((p: { slug: string }) => ({
    slug: p.slug,
  }));
}

type TecnologiaType = {
  nombre: string;
};

interface Proyecto {
  slug: string;
  titulo: string;
  descripcion: string;
  detalles: string;
  imagen: { url: string; public_id: string };
  tecnologias: (string | TecnologiaType)[];
}

export default async function ProyectoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await connectToDatabase();
  const { slug } = await params;
  const proyecto: Proyecto = await Proyecto.findOne({ slug: slug }).populate(
    "tecnologias",
    "nombre"
  );

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
            src={proyecto.imagen.url}
            alt={proyecto.titulo}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <article className="prose prose-invert prose-neutral max-w-none text-gray-200 mb-6">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]} // opcional, solo si usás HTML embebido
            components={markdownComponents}
          >
            {proyecto.detalles}
          </ReactMarkdown>
        </article>

        <h2 className="text-xl font-semibold text-[#9B3922] mb-2">
          Tecnologías utilizadas:
        </h2>
        <ul className="flex flex-wrap gap-2">
          {Array.isArray(proyecto.tecnologias) &&
            proyecto.tecnologias.map((tec, index: number) => (
              <li
                key={index + "key"}
                className="bg-[#481E14] text-sm px-3 py-1 rounded-full text-white"
              >
                {typeof tec === "string" ? tec : tec.nombre}
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}
