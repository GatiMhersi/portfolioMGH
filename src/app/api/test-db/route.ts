import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    await connectToDatabase();
    return NextResponse.json({ message: '✅ Conexión a MongoDB exitosa' });
  } catch (error) {
    console.error('❌ Error al conectar con MongoDB:', error);
    return NextResponse.json({ message: '❌ Error de conexión' }, { status: 500 });
  }
}
