// 📁 app/api/proyectos/route.ts
import { handleCreateProyecto, handleGetProyectos } from '@/controllers/proyectoController'

export async function POST(req: Request) {
  return handleCreateProyecto(req)
}

export async function GET() {
  return handleGetProyectos()
}
