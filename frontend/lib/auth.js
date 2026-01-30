import { cookies } from 'next/headers';

const COOKIE_NAME = 'olimpohub_token';
const USER_COOKIE_NAME = 'olimpohub_user';

export async function getAuthToken() {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value || null;
}

export async function getUser() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get(USER_COOKIE_NAME)?.value;
  
  if (!userCookie) return null;
  
  try {
    return JSON.parse(userCookie);
  } catch {
    return null;
  }
}

export async function isAuthenticated() {
  const token = await getAuthToken();
  return !!token;
}
