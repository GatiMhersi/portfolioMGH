// services/roleService.js
import Rol from '@/models/Rol'

export const crearRol = async ({ nombre, descripcion }) => {
  const nuevoRol = new Rol({ nombre, descripcion })
  return await nuevoRol.save()
}

export const editarRol = async (id, datosActualizados) => {
  return await Rol.findByIdAndUpdate(id, datosActualizados, { new: true })
}

export const obtenerRoles = async () => {
  return await Rol.find()
}

export const eliminarRol = async (id) => {
  return await Rol.findByIdAndDelete(id)
}
