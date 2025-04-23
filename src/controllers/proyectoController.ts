import { NextResponse } from 'next/server'
import {
  createProyecto,
  getProyectos,
  updateProyecto,
  deleteProyecto
} from '@/services/proyectoService'
import type { ProyectoType } from '@/types/Proyecto'

export const handleCreateProyecto = async (req: Request) => {
  try {
    const body: ProyectoType = await req.json()
    const nuevoProyecto = await createProyecto(body)
    return NextResponse.json(nuevoProyecto, { status: 201 })
  } catch (error: unknown) {
    const mensaje = error instanceof Error ? error.message : 'Error al crear proyecto'
    return NextResponse.json({ error: mensaje }, { status: 400 })
  }
}

export const handleGetProyectos = async () => {
  try {
    const proyectos = await getProyectos()
    return NextResponse.json(proyectos, { status: 200 })
  } catch (error: unknown) {
    const mensaje = error instanceof Error ? error.message : 'Error al obtener proyectos'
    return NextResponse.json({ error: mensaje }, { status: 500 })
  }
}

export const handleUpdateProyecto = async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const param = await params
    const body: Partial<ProyectoType> = await req.json()
    const proyectoActualizado = await updateProyecto(param.id, body)
    return NextResponse.json(proyectoActualizado, { status: 200 })
  } catch (error: unknown) {
    const mensaje = error instanceof Error ? error.message : 'Error al actualizar proyecto'
    return NextResponse.json({ error: mensaje }, { status: 400 })
  }
}

export const handleDeleteProyecto = async (_: Request, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const param = await params
    const resultado = await deleteProyecto(param.id)
    return NextResponse.json(resultado, { status: 200 })
  } catch (error: unknown) {
    const mensaje = error instanceof Error ? error.message : 'Error al eliminar proyecto'
    return NextResponse.json({ error: mensaje }, { status: 500 })
  }
}
