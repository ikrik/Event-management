import { CURRENT_URL } from '@constants/endpoints';
import { formatDate } from '@utils/helpers';
import { ReactNode } from 'react';
import { EventItem } from 'types/events.types';
import Home from '@components/home/Home';

export default async function HomePage() {
  let data: (EventItem & Record<string, ReactNode>)[] = [];
  try {
    const res = await fetch(`${CURRENT_URL}/api/events`);
    data = await res.json();
  } catch (e) {
    console.error('Initial Event loading Went wrong', e);
  }

  if (data.length > 0) {
    data = data.map((item) => ({ ...item, date: formatDate(item.date) }));
  }

  return <Home initialEvents={data} />;
}
