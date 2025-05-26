import {
  handleUpdateProyecto,
  handleDeleteProyecto,
} from "@/controllers/proyectoController";
import { requireAuth } from "@/services/reqAuth";

// Nota: pasamos `params` como una Promise para evitar errores de tipado en build.
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();
    return handleUpdateProyecto(req, context);
  } catch {
    return new Response(JSON.stringify({ error: "No autorizado" }), {
      status: 401,
    });
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();
    return handleDeleteProyecto(req, context);
  } catch {
    return new Response(JSON.stringify({ error: "No autorizado" }), {
      status: 401,
    });
  }
}
