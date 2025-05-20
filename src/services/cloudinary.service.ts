// services/cloudinary.service.ts
import { v2 as cloudinary, UploadApiResponse  } from "cloudinary";
import { Readable } from "stream";
import { cloudinaryConfig } from "@/lib/cloudinary.config";

cloudinaryConfig();

export async function uploadImageService(file: File, folder: string): Promise<UploadApiResponse > {
  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder }, // ahora se usa el folder recibido dinámicamente
      (error, result) => {
        if (error) return reject(error);
        resolve(result as UploadApiResponse);
      }
    );

    Readable.from(buffer).pipe(uploadStream);
  });
}

export async function replaceImageService(file: File, folder: string, publicIdToDelete: string) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;

  // 1. Eliminar la imagen anterior
  await cloudinary.uploader.destroy(publicIdToDelete);

  // 2. Subir la nueva imagen
  const result = await cloudinary.uploader.upload(base64Image, {
    folder,
  });

  return {
    secure_url: result.secure_url,
    public_id: result.public_id,
  };
}

// lib/services/cloudinaryService.ts

export async function eliminarImagen(public_id: string) {
  try {
    const result = await cloudinary.uploader.destroy(public_id);
    return result;
  } catch (error) {
    console.error('Error eliminando imagen de Cloudinary:', error);
    throw new Error('Error eliminando imagen de Cloudinary');
  }
}

