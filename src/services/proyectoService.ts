import Proyecto from '@/models/Proyecto'
import '@/models/Tecnologia'
import { connectToDatabase } from '@/lib/mongodb'
import type { ProyectoType } from '@/types/Proyecto' // asegurate de crearlo

export const createProyecto = async (data: ProyectoType) => {
  await connectToDatabase()
  const nuevoProyecto = new Proyecto(data)
  return await nuevoProyecto.save()
}

export const getProyectos = async () => {
  await connectToDatabase()
  return await Proyecto.find().populate("tecnologias", "nombre");
}

export const updateProyecto = async (id: string, data: Partial<ProyectoType>) => {
  await connectToDatabase()
  return await Proyecto.findByIdAndUpdate(id, data, { new: true })
}

export const deleteProyecto = async (id: string) => {
  await connectToDatabase()
  return await Proyecto.findByIdAndDelete(id)
}
