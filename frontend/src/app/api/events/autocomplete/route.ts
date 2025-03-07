/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import { BASE_API_URL } from '@constants/endpoints';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const res = await fetch(`${BASE_API_URL}/events/autocomplete?${searchParams.toString()}`);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const events = await res.json(); // Await the JSON parsing
    return NextResponse.json(events); // Return the parsed data
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 }); // Return a proper error response
  }
}
