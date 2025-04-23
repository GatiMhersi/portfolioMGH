import { NextResponse } from 'next/server'
import { createDailyLog, getDailyLogs, updateDailyLog, deleteDailyLog } from '@/services/dailyLogService'
import { DailyLogType } from '@/types/DailyLog'

export const handleCreateDailyLog = async (req: Request) => {
  try {
    const body: DailyLogType = await req.json()
    const newLog = await createDailyLog(body)
    return NextResponse.json(newLog, { status: 201 })
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Error al crear entrada'
    return NextResponse.json({ error: msg }, { status: 400 })
  }
}

export const handleGetDailyLogs = async () => {
  try {
    const logs = await getDailyLogs()
    return NextResponse.json(logs, { status: 200 })
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Error al obtener entradas'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

export const handleUpdateDailyLog = async (req: Request, { params }: { params: Promise<{ id: string }> } ) => {
  try {
    const { id } = await params
    const body: Partial<DailyLogType> = await req.json()
    const updatedLog = await updateDailyLog(id, body)
    return NextResponse.json(updatedLog, { status: 200 })
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Error al actualizar entrada'
    return NextResponse.json({ error: msg }, { status: 400 })
  }
}

export const handleDeleteDailyLog = async (_: Request, { params }: { params: Promise<{ id: string }> } ) => {
  try {
    const { id } = await params
    const deleted = await deleteDailyLog(id)
    return NextResponse.json(deleted, { status: 200 })
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Error al eliminar entrada'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}