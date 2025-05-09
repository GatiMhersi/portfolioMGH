// types/Tecnologia.ts

export interface TecnologiaType {
  nombre: string;
  icono?: {
    url: string;
    public_id: string;
  };
  descripcion?: string;
  rol: string; // ID de Rol como string
  proyectos?: string[]; // Array de IDs de proyectos como string
}
