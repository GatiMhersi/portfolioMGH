export interface DailyLogType {
    fecha: string
    tareas: {
      time: string
      activity: string
      project: string // Mongo ObjectId en string
    }[]
  }