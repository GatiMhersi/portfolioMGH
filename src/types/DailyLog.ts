export interface DailyLogType {
    _id: string
    fecha: string
    tareas: {
      time: string
      activity: string
      project: string // Mongo ObjectId en string
    }[]
  }