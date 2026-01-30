import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getStrapiURL } from '@/lib/strapi';

const COOKIE_NAME = 'olimpohub_token';

// GET - Fetch user's quests
export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch quests from Strapi - filter by owner (user)
    const response = await fetch(
      getStrapiURL('/api/quests?populate=owner&filters[owner][id][$notNull]=true'),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.error?.message || 'Failed to fetch quests' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.log('[v0] Get quests error:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching quests' },
      { status: 500 }
    );
  }
}

// POST - Create a new quest
export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get current user
    const userResponse = await fetch(getStrapiURL('/api/users/me'), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!userResponse.ok) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await userResponse.json();

    const body = await request.json();
    const { title, difficulty, reward, isPublic } = body;

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    // Create quest in Strapi with owner relation
    const response = await fetch(getStrapiURL('/api/quests'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: {
          title,
          difficulty: difficulty || 'easy',
          reward: reward || '',
          isPublic: isPublic || false,
          owner: user.id,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.error?.message || 'Failed to create quest' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.log('[v0] Create quest error:', error);
    return NextResponse.json(
      { error: 'An error occurred while creating the quest' },
      { status: 500 }
    );
  }
}
