// controllers/image.controller.ts
import { uploadImageService, eliminarImagen, replaceImageService } from "@/services/cloudinary.service";
import { NextResponse } from "next/server";

export async function uploadImageController(file: File, folder: string) {
  return await uploadImageService(file, folder);
}

export async function replaceImageController(file: File, folder: string, public_id: string) {
  return await replaceImageService(file, folder, public_id);
}

export async function deleteImageController(req: Request) {
  try {
    const { public_id } = await req.json();

    if (!public_id) {
      return NextResponse.json({ error: 'El public_id es requerido' }, { status: 400 });
    }

    const result = await eliminarImagen(public_id);

    if (result.result !== 'ok' && result.result !== 'not found') {
      return NextResponse.json({ error: 'No se pudo eliminar la imagen' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error en deleteImageController:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
