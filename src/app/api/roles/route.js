// app/api/roles/route.js
import { handleCreateRol, handleGetRoles } from "@/controllers/roleController";
import { connectToDatabase } from "@/lib/mongodb";
import { requireAuth } from "@/services/reqAuth";

export async function GET() {
  await connectToDatabase();
  return handleGetRoles();
}

export async function POST(req) {
  try {
    await requireAuth();
    await connectToDatabase();
    return handleCreateRol(req);
  } catch {
    return new Response(JSON.stringify({ error: "No autorizado" }), {
      status: 401,
    });
  }
}
