// controllers/image.controller.ts
import { uploadImageService } from "@/services/cloudinary.service";

export async function uploadImageController(file: File, folder: string) {
  return await uploadImageService(file, folder);
}
