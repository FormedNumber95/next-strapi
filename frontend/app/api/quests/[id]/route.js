import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getStrapiURL } from '@/lib/strapi';

const COOKIE_NAME = 'olimpohub_token';

// DELETE - Delete a quest
export async function DELETE(request, { params }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const response = await fetch(getStrapiURL(`/api/quests/${id}`), {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.error?.message || 'Failed to delete quest' },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log('[v0] Delete quest error:', error);
    return NextResponse.json(
      { error: 'An error occurred while deleting the quest' },
      { status: 500 }
    );
  }
}

// PUT - Update a quest
export async function PUT(request, { params }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { title, difficulty, reward, isPublic } = body;

    const response = await fetch(getStrapiURL(`/api/quests/${id}`), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: {
          title,
          difficulty,
          reward,
          isPublic,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.error?.message || 'Failed to update quest' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.log('[v0] Update quest error:', error);
    return NextResponse.json(
      { error: 'An error occurred while updating the quest' },
      { status: 500 }
    );
  }
}
