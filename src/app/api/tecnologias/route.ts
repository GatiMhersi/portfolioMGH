// --- app/api/tecnologias/route.ts ---

import {
  handleGetTecnologias,
  handleCreateTecnologia,  
} from '@/controllers/tecnologiaController'
import { requireAuth } from "@/services/reqAuth";

export async function GET() {
  return handleGetTecnologias()
}

export async function POST(req: Request) {
  try {
      await requireAuth();
      return handleCreateTecnologia(req)
    } catch {
      return new Response(JSON.stringify({ error: "No autorizado" }), {
        status: 401,
      });
    }
  
}
