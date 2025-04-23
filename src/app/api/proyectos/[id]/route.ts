import {
    handleUpdateProyecto,
    handleDeleteProyecto
  } from '@/controllers/proyectoController'
  
  export async function PUT(req: Request, context: { params: { id: string } }) {
    return handleUpdateProyecto(req, context)
  }
  
  export async function DELETE(req: Request, context: { params: { id: string } }) {
    return handleDeleteProyecto(req, context)
  }
  