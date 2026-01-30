import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getStrapiURL } from '@/lib/strapi';

const COOKIE_NAME = 'olimpohub_token';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // Verify token with Strapi
    const response = await fetch(getStrapiURL('/api/users/me'), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      // Token invalid, clear cookies
      cookieStore.delete(COOKIE_NAME);
      cookieStore.delete('olimpohub_user');
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const user = await response.json();

    return NextResponse.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log('[v0] Get user error:', error);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}
