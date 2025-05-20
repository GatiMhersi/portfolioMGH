import mongoose from 'mongoose'

/**
 * Esquema para representar tus proyectos personales o profesionales.
 * Cada proyecto puede tener muchas tecnologías asociadas.
 */
const ProyectoSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true }, // URL amigable, ej: "felice-joyas"
  titulo: { type: String, required: true }, // Título del proyecto
  descripcion: String, // Breve descripción
  detalles: String, // Detalles técnicos o funcionales
  imagen: {
    url: { type: String, required: true },       // URL de Cloudinary para mostrar el ícono
    public_id: { type: String, required: true }  // public_id necesario para eliminarlo
  },
  tecnologias: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tecnologia' }] // Relación con tecnologías
})

export default mongoose.models.Proyecto || mongoose.model('Proyecto', ProyectoSchema)
