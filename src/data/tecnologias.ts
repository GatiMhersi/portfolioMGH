export interface Tecnologia {
    _id: { $oid: string };
    nombre: string;
    icono: string;
    descripcion: string;
    rol: { $oid: string };
    proyectos: string[];
    __v: number;
  }
  
  export const tecnologias: Tecnologia[] = [
    {
      _id: { $oid: "6808f43b5eae79d176c218cb" },
      nombre: "React",
      icono: "react-icon.png",
      descripcion: "Librería para construir interfaces de usuario",
      rol: { $oid: "68080f882791181c060cd7b1" },
      proyectos: [],
      __v: 0,
    },
    {
      _id: { $oid: "6808f43b5eae79d176c218cc" },
      nombre: "Next.js",
      icono: "nextjs-icon.png",
      descripcion: "Framework de React para aplicaciones web",
      rol: { $oid: "68080f882791181c060cd7b2" },
      proyectos: [],
      __v: 0,
    },
    {
      _id: { $oid: "6808f43b5eae79d176c218cd" },
      nombre: "Tailwind CSS",
      icono: "tailwind-icon.png",
      descripcion: "Framework de utilidades para estilos rápidos",
      rol: { $oid: "68080f882791181c060cd7b3" },
      proyectos: [],
      __v: 0,
    },
    {
      _id: { $oid: "6808f43b5eae79d176c218ce" },
      nombre: "MongoDB",
      icono: "mongodb-icon.png",
      descripcion: "Base de datos NoSQL orientada a documentos",
      rol: { $oid: "68080f882791181c060cd7b4" },
      proyectos: [],
      __v: 0,
    },
    {
      _id: { $oid: "6808f43b5eae79d176c218cf" },
      nombre: "Firebase",
      icono: "firebase-icon.png",
      descripcion: "Plataforma de desarrollo de apps de Google",
      rol: { $oid: "68080f882791181c060cd7b5" },
      proyectos: [],
      __v: 0,
    }
  ];
  