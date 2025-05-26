import { handleCreateDailyLog, handleGetDailyLogs } from '@/controllers/dailyLogController'
import { requireAuth } from "@/services/reqAuth";

export async function POST(req: Request) {
  try {
    await requireAuth()
    return handleCreateDailyLog(req)
  } catch {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 401,
    })
  }
}
export const GET = handleGetDailyLogs