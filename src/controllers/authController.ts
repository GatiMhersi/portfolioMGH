// controllers/authController.ts
import { loginUser,registerUser } from '@/services/authService';
import { NextResponse } from 'next/server';


export const handleRegister = async (req: Request) => {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Faltan datos' }), {
        status: 400,
      });
    }

    const result = await registerUser(email, password);

    return new Response(JSON.stringify(result), {
      status: 201,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 400,
    });
  }
};

export const handleLogin = async (req: Request) => {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Faltan datos' }, { status: 400 });
    }

    const { user, token } = await loginUser(email, password);

    const response = NextResponse.json({ user }, { status: 200 });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 semana
      sameSite: 'lax',
    });

    return response;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
    return NextResponse.json({ error: errorMessage }, { status: 401 });
  }
};

