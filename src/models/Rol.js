import mongoose from 'mongoose'

/**
 * Esquema para los roles de desarrollo (Frontend, Backend, etc.)
 * Cada tecnología pertenece a un único rol.
 */
const RolSchema = new mongoose.Schema({
  nombre: { type: String, required: true }, // Nombre del rol, ej: "Frontend"
  descripcion: String // Descripción opcional del rol
})

// Exportamos el modelo o usamos el existente si ya está definido
export default mongoose.models.Rol || mongoose.model('Rol', RolSchema)
