// app/api/roles/[id]/route.js
import { handleUpdateRol, handleDeleteRol } from '@/controllers/roleController'
import { connectToDatabase } from '@/lib/mongodb'

export async function PUT(req, context) {
  await connectToDatabase()
  return handleUpdateRol(req, context)
}

export async function DELETE(_, context) {
  await connectToDatabase()
  return handleDeleteRol(_, context)
}
