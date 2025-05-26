import { handleDeleteDailyLog, handleUpdateDailyLog } from '@/controllers/dailyLogController'
import { requireAuth } from "@/services/reqAuth";

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth()
    return handleDeleteDailyLog(req, context)
  } catch {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 401,
    })
  }
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth()
    return handleUpdateDailyLog(req, context)
  } catch {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 401,
    })
  }
}
