/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import { BASE_API_URL } from '@constants/endpoints';

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams.toString();
  const queryParams = params?.length > 0 ? `?${params}` : '';
  try {
    const res = await fetch(`${BASE_API_URL}/events${queryParams}`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const events = await res.json();
    return NextResponse.json(events);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const res = await fetch(`${BASE_API_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error('Failed to Save the data');
    }
    const events = await res.json();
    return NextResponse.json(events);
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { id, ...restBody } = body;

  if (!id) {
    return NextResponse.json({ error: 'Missing event ID' }, { status: 400 });
  }

  try {
    const res = await fetch(`${BASE_API_URL}/events/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(restBody),
    });

    if (!res.ok) {
      throw new Error('Failed to Update the data');
    }

    const updatedEvent = await res.json();
    return NextResponse.json(updatedEvent);
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
