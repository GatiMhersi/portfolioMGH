import mongoose from 'mongoose'

/**
 * Esquema para representar tecnologías usadas en proyectos.
 * Cada tecnología pertenece a un rol y puede ser usada en varios proyectos.
 */
const TecnologiaSchema = new mongoose.Schema({
  nombre: { type: String, required: true }, // Ej: React, Next.js, etc.
  icono: {
    url: { type: String, required: true },       // URL de Cloudinary para mostrar el ícono
    public_id: { type: String, required: true }  // public_id necesario para eliminarlo
  },
  descripcion: String,
  rol: { type: mongoose.Schema.Types.ObjectId, ref: 'Rol' },
  proyectos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Proyecto' }]
})

export default mongoose.models.Tecnologia || mongoose.model('Tecnologia', TecnologiaSchema)
