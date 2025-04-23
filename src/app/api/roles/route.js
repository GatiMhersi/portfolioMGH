// app/api/roles/route.js
import { handleCreateRol, handleGetRoles } from '@/controllers/roleController'
import { connectToDatabase } from '@/lib/mongodb'


export async function GET() {
  await connectToDatabase()
  return handleGetRoles()
}

export async function POST(req) {
  await connectToDatabase()
  return handleCreateRol(req)
}
