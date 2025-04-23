import {
  handleUpdateProyecto,
  handleDeleteProyecto
} from '@/controllers/proyectoController'

// Nota: pasamos `params` como una Promise para evitar errores de tipado en build.
export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  return handleUpdateProyecto(req, context)
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  return handleDeleteProyecto(req, context)
}
