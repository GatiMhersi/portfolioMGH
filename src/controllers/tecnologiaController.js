import { NextResponse } from 'next/server'
import {
  getTecnologias,
  createTecnologia,
  updateTecnologia,
  deleteTecnologia
} from '@/services/tecnologiaService'

export const handleGetTecnologias = async () => {
  try {
    const tecnologias = await getTecnologias()
    return NextResponse.json(tecnologias, { status: 200 })
  } catch (error) {
    console.error('Error al obtener tecnologías:', error) // <--- Aquí se usa el error
    return NextResponse.json(
      { error: 'Error al obtener tecnologías' },
      { status: 500 }
    )
  }
}

export const handleCreateTecnologia = async (req) => {
  try {
    const body = await req.json()
    const nuevaTecnologia = await createTecnologia(body)
    return NextResponse.json(nuevaTecnologia, { status: 201 })
  } catch (error) {
    console.error('Error al crear tecnología:', error)
    return NextResponse.json({ error: 'Error al crear tecnología' }, { status: 400 })
  }
}

export const handleUpdateTecnologia = async (req, { params }) => {
  try {
    const param = await params
    const body = await req.json()
    const tecnologiaActualizada = await updateTecnologia(param.id, body)
    return NextResponse.json(tecnologiaActualizada, { status: 200 })
  } catch (error) {
    console.error('Error al actualizar tecnología:', error)
    return NextResponse.json({ error: 'Error al actualizar tecnología' }, { status: 400 })
  }
}

export const handleDeleteTecnologia = async (_, { params }) => {
  try {
    const param = await params
    const resultado = await deleteTecnologia(param.id)
    return NextResponse.json(resultado, { status: 200 })
  } catch (error) {
    console.error('Error al eliminar tecnología:', error)
    return NextResponse.json({ error: 'Error al eliminar tecnología' }, { status: 500 })
  }
}
