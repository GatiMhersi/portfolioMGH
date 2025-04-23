// --- app/api/tecnologias/route.ts ---

import {
  handleGetTecnologias,
  handleCreateTecnologia,  
} from '@/controllers/tecnologiaController'

export async function GET() {
  return handleGetTecnologias()
}

export async function POST(req: Request) {
  return handleCreateTecnologia(req)
}
