import Tecnologia from '@/models/Tecnologia'
import { connectToDatabase } from '@/lib/mongodb'

export const getTecnologias = async () => {
  await connectToDatabase()
  return await Tecnologia.find()
}

export const createTecnologia = async (data: any) => {
  await connectToDatabase()
  const nuevaTecnologia = new Tecnologia(data)
  return await nuevaTecnologia.save()
}

export const updateTecnologia = async (id: string, data: any) => {
  await connectToDatabase()
  return await Tecnologia.findByIdAndUpdate(id, data, { new: true })
}

export const deleteTecnologia = async (id: string) => {
  await connectToDatabase()
  await Tecnologia.findByIdAndDelete(id)
  return { message: 'Tecnología eliminada correctamente' }
}
