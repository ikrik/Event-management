'use client';

import { Button } from '@components/button/Button';
import { FC } from 'react';

const basicStyles = 'bg-lime-300 text-black hover:bg-lime-400 hover:cursor-pointer';

export const EventCreateButton: FC = () => {
  const handleCreateEvent = () => {
    alert('Create event clicked!');
  };

  return (
    <Button onClick={handleCreateEvent} classes={basicStyles}>
      Create Event
    </Button>
  );
};
