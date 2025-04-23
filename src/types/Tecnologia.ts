// types/Tecnologia.ts

export interface TecnologiaType {
    nombre: string
    icono?: string
    descripcion?: string
    rol: string // ID de Rol como string
    proyectos?: string[] // Array de IDs de proyectos como string
  }
  