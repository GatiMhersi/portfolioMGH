import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;

export const config = {
  matcher: '/dashboard/:path*',
};

export async function middleware(request: NextRequest) {
  console.log('🔥 Middleware ejecutado para:', request.nextUrl.pathname);

  const token = request.cookies.get('token')?.value;
  if (!token || !JWT_SECRET) {
    console.log('🚫 No token o secreto, redirigiendo...');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    console.log('✅ Token válido:', payload);

    return NextResponse.next();
  } catch (err) {
    console.log('🚫 Token inválido:', err);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
