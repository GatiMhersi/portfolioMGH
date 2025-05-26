// app/api/roles/[id]/route.js
import { handleUpdateRol, handleDeleteRol } from "@/controllers/roleController";
import { connectToDatabase } from "@/lib/mongodb";
import { requireAuth } from "@/services/reqAuth";

export async function PUT(req, context) {
  try {
    await requireAuth();
    await connectToDatabase();
    return handleUpdateRol(req, context);
  } catch {
    return new Response(JSON.stringify({ error: "No autorizado" }), {
      status: 401,
    });
  }
}

export async function DELETE(_, context) {
  try {
    await requireAuth();
    await connectToDatabase();
    return handleDeleteRol(_, context);
  } catch {
    return new Response(JSON.stringify({ error: "No autorizado" }), {
      status: 401,
    });
  }
}
