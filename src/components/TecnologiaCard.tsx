// components/TecnologiaCard.tsx
import Image from "next/image";

interface Props {
  nombre: string;
  icono: string;
}

export default function TecnologiaCard({ nombre, icono }: Props) {
  return (
    <div className="w-28 h-28 flex flex-col items-center justify-between bg-white/10 p-4 rounded-xl hover:bg-white/20 transition text-center">
      <div className="w-12 h-12 flex items-center justify-center p-2">
        <Image
          src={icono}
          alt={nombre}
          width={48}
          height={48}
          className="object-contain"
        />
      </div>
      <span className="text-white text-sm font-medium">{nombre}</span>
    </div>
  );
}
