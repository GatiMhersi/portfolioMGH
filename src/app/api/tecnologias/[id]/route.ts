import {
    handleUpdateTecnologia,
    handleDeleteTecnologia
  } from '@/controllers/tecnologiaController'
  import { requireAuth } from "@/services/reqAuth";
  
  export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
    try {
        await requireAuth();
        return handleUpdateTecnologia(req, context)
      } catch {
        return new Response(JSON.stringify({ error: "No autorizado" }), {
          status: 401,
        });
      }
    
  }
  
  export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
    try {
        await requireAuth();
        return handleDeleteTecnologia(req, context)
      } catch {
        return new Response(JSON.stringify({ error: "No autorizado" }), {
          status: 401,
        });
      }
    
  }
  