// services/tecnologiaService.ts
import '@/models/Rol'
import Tecnologia from '@/models/Tecnologia'
import { connectToDatabase } from '@/lib/mongodb'
import { TecnologiaType } from '@/types/Tecnologia'

export const getTecnologias = async () => {
  await connectToDatabase()
  return await Tecnologia.find().populate('rol','nombre descripcion').populate('proyectos', 'slug')
}

export const createTecnologia = async (data: TecnologiaType) => {
  await connectToDatabase()
  const nuevaTecnologia = new Tecnologia(data)
  return await nuevaTecnologia.save()
}

export const updateTecnologia = async (id: string, data: Partial<TecnologiaType>) => {
  await connectToDatabase()
  return await Tecnologia.findByIdAndUpdate(id, data, { new: true })
}

export const deleteTecnologia = async (id: string) => {
  await connectToDatabase()
  await Tecnologia.findByIdAndDelete(id)
  return { message: 'Tecnología eliminada correctamente' }
}
