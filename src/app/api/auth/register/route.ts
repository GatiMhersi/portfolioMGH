// app/api/auth/register/route.ts
import { handleRegister } from '@/controllers/authController';

export async function POST(req: Request) {
  return handleRegister(req);
}
