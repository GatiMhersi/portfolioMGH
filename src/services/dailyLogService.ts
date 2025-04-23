import DailyLog from '@/models/DailyLog'
import { connectToDatabase } from '@/lib/mongodb'
import { DailyLogType } from '@/types/DailyLog'

export const createDailyLog = async (data: DailyLogType) => {
  await connectToDatabase()
  const newLog = new DailyLog(data)
  return await newLog.save()
}

export const getDailyLogs = async () => {
  await connectToDatabase()
  return await DailyLog.find()
}

export const updateDailyLog = async (id: string, data: Partial<DailyLogType>) => {
  await connectToDatabase()
  return await DailyLog.findByIdAndUpdate(id, data, { new: true })
}

export const deleteDailyLog = async (id: string) => {
  await connectToDatabase()
  return await DailyLog.findByIdAndDelete(id)
}