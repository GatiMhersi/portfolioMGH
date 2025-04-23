import {
    handleUpdateTecnologia,
    handleDeleteTecnologia
  } from '@/controllers/tecnologiaController'
  
  export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
    return handleUpdateTecnologia(req, context)
  }
  
  export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
    return handleDeleteTecnologia(req, context)
  }
  