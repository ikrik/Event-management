/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import { BASE_API_URL } from '@constants/endpoints';

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams.toString();
  const queryParams = params?.length > 0 ? `?${params}` : '';
  try {
    const res = await fetch(`${BASE_API_URL}/events${queryParams}`);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const events = await res.json();
    return NextResponse.json(events);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}
