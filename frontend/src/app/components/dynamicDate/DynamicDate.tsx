'use client';
import { FC, useEffect, useState } from 'react';

export const DynamicDate: FC = () => {
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    setDate(new Date());

    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!date) return null;

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(date);

  return <p className="text-zinc-400 text-xl">{formattedDate}</p>;
};
