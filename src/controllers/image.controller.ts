// controllers/image.controller.ts
import { uploadImageService } from "@/services/cloudinary.service";
import { replaceImageService } from "@/services/cloudinary.service";

export async function uploadImageController(file: File, folder: string) {
  return await uploadImageService(file, folder);
}

export async function replaceImageController(file: File, folder: string, public_id: string) {
  return await replaceImageService(file, folder, public_id);
}