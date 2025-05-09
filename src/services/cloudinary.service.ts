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
