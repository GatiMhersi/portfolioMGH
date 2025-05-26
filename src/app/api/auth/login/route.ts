// app/api/auth/login/route.ts
import { handleLogin } from '@/controllers/authController';

export async function POST(req: Request) {
  return handleLogin(req);
}
