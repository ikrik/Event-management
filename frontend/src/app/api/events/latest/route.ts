/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import { BASE_API_URL } from '@constants/endpoints';

export async function GET() {
  try {
    const res = await fetch(`${BASE_API_URL}/events/latest`);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const latestEvent = await res.json();

    return NextResponse.json(latestEvent); // Return the latest event
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch the latest event' }, { status: 500 });
  }
}
