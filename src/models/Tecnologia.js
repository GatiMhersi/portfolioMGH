import mongoose from 'mongoose'

/**
 * Esquema para representar tecnologías usadas en proyectos
 * Cada tecnología pertenece a un rol y puede ser usada en varios proyectos.
 */
const TecnologiaSchema = new mongoose.Schema({
  nombre: { type: String, required: true }, // Ej: React, Next.js, etc.
  icono: String, // Ruta al icono de la tecnología
  descripcion: String,
  rol: { type: mongoose.Schema.Types.ObjectId, ref: 'Rol' }, // Relación con el rol
  proyectos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Proyecto' }] // Relación inversa opcional
})

export default mongoose.models.Tecnologia || mongoose.model('Tecnologia', TecnologiaSchema)
