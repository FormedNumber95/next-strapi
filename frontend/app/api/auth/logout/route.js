import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const COOKIE_NAME = 'olimpohub_token';
const USER_COOKIE_NAME = 'olimpohub_user';

export async function POST() {
  try {
    const cookieStore = await cookies();
    
    // Delete both cookies
    cookieStore.delete(COOKIE_NAME);
    cookieStore.delete(USER_COOKIE_NAME);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log('[v0] Logout error:', error);
    return NextResponse.json(
      { error: 'An error occurred during logout' },
      { status: 500 }
    );
  }
}
