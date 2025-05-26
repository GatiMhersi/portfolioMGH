// 📁 app/api/proyectos/route.ts
import {
  handleCreateProyecto,
  handleGetProyectos,
} from "@/controllers/proyectoController";
import { requireAuth } from "@/services/reqAuth";

export async function POST(req: Request) {
  try {
    await requireAuth();
    return handleCreateProyecto(req);
  } catch {
    return new Response(JSON.stringify({ error: "No autorizado" }), {
      status: 401,
    });
  }
}

export async function GET() {
  return handleGetProyectos();
}
