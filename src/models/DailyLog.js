import mongoose from 'mongoose'

/**
 * Esquema para registrar actividades diarias importantes.
 * Cada entrada se vincula con un proyecto específico.
 */
const DailyLogSchema = new mongoose.Schema({
  fecha: { type: String, required: true }, // Formato: "YYYY-MM-DD"
  tareas: [
    {
      time: String, // Ej: "08:30"
      activity: String, // Ej: "Fix en formulario"
      project: { type: mongoose.Schema.Types.ObjectId, ref: 'Proyecto' } // Proyecto relacionado
    }
  ]
})

export default mongoose.models.DailyLog || mongoose.model('DailyLog', DailyLogSchema)
