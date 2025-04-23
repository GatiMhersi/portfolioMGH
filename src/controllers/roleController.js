// controllers/roleController.js
import {
    crearRol,
    editarRol,
    obtenerRoles,
    eliminarRol
  } from '@/services/roleService'
  
  export async function handleGetRoles() {
    const roles = await obtenerRoles()
    return new Response(JSON.stringify(roles), { status: 200 })
  }
  
  export async function handleCreateRol(req) {
    const body = await req.json()
    if (!body.nombre) {
      return new Response(JSON.stringify({ mensaje: 'Falta el nombre' }), { status: 400 })
    }
  
    const nuevoRol = await crearRol(body)
    return new Response(JSON.stringify(nuevoRol), { status: 201 })
  }
  
  export async function handleUpdateRol(req, { params }) {
    const param = await params
    const id = param.id
    const body = await req.json()
    const actualizado = await editarRol(id, body)
  
    if (!actualizado) {
      return new Response(JSON.stringify({ mensaje: 'Rol no encontrado' }), { status: 404 })
    }
  
    return new Response(JSON.stringify(actualizado), { status: 200 })
  }
  
  export async function handleDeleteRol(_, { params }) {
    const param = await params
    const eliminado = await eliminarRol(param.id)
    if (!eliminado) {
      return new Response(JSON.stringify({ mensaje: 'Rol no encontrado' }), { status: 404 })
    }
  
    return new Response(JSON.stringify({ mensaje: 'Rol eliminado' }), { status: 200 })
  }
  