// app/api/delete-image/route.ts
import { deleteImageController } from '@/controllers/image.controller';

export async function DELETE(req: Request) {
  return deleteImageController(req);
}
