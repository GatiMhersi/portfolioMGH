// data/tecnologias.ts
export const tecnologiasPorRol = [
  {
    rol: "Frontend",
    tecnologias: [
      {
        nombre: "React",
        icono: "/icons/react.png",
        description: "Librería de JavaScript para construir interfaces de usuario.",
        proyectos: ["Felice Joyas", "Telecom Landing Page"]
      },
      {
        nombre: "Next.js",
        icono: "/icons/nextjs.png",
        description: "Framework de React para aplicaciones web con renderizado del lado del servidor.",
        proyectos: ["Felice Joyas"]
      },
      {
        nombre: "Tailwind CSS",
        icono: "/icons/tailwind.png",
        description: "Framework de CSS utilitario para diseñar interfaces modernas de forma rápida.",
        proyectos: ["Felice Joyas", "Telecom Landing Page"]
      },
      {
        nombre: "Framer Motion",
        icono: "/icons/framer.svg",
        description: "Librería de animaciones para React con una API simple y poderosa.",
        proyectos: ["Felice Joyas"]
      }
    ]
  },
  {
    rol: "Backend",
    tecnologias: [
      {
        nombre: "Node.js",
        icono: "/icons/nodejs.webp",
        description: "Entorno de ejecución para JavaScript del lado del servidor.",
        proyectos: ["Felice Joyas"]
      },
      {
        nombre: "Express",
        icono: "/icons/express.png",
        description: "Framework minimalista y flexible para construir APIs con Node.js.",
        proyectos: ["Felice Joyas"]
      },
      {
        nombre: "MongoDB",
        icono: "/icons/mongodb.svg",
        description: "Base de datos NoSQL orientada a documentos, ideal para aplicaciones modernas.",
        proyectos: ["Felice Joyas"]
      }
    ]
  },
  {
    rol: "Herramientas",
    tecnologias: [
      {
        nombre: "Git",
        icono: "/icons/git.svg",
        description: "Sistema de control de versiones distribuido para rastrear cambios en el código.",
        proyectos: ["Felice Joyas", "Telecom Landing Page"]
      },
      {
        nombre: "GitHub",
        icono: "/icons/github.png",
        description: "Plataforma de alojamiento de código que facilita la colaboración con Git.",
        proyectos: ["Felice Joyas", "Telecom Landing Page"]
      },
      {
        nombre: "Figma",
        icono: "/icons/figma.png",
        description: "Herramienta de diseño colaborativo para interfaces y prototipos.",
        proyectos: ["Felice Joyas"]
      }
    ]
  }
];
