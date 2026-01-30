import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getStrapiURL } from '@/lib/strapi';

const COOKIE_NAME = 'olimpohub_token';
const USER_COOKIE_NAME = 'olimpohub_user';

export async function POST(request) {
  try {
    const body = await request.json();
    const { identifier, password } = body;

    if (!identifier || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Call Strapi auth endpoint
    const response = await fetch(getStrapiURL('/api/auth/local'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identifier, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.message || 'Invalid credentials' },
        { status: 401 }
      );
    }

    const { jwt, user } = data;

    // Set cookies
    const cookieStore = await cookies();
    
    // Set JWT token as httpOnly cookie
    cookieStore.set(COOKIE_NAME, jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    // Set user info (non-sensitive) as regular cookie for client access
    cookieStore.set(USER_COOKIE_NAME, JSON.stringify({
      id: user.id,
      username: user.username,
      email: user.email,
    }), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log('[v0] Login error:', error);
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    );
  }
}
