'use client';

import { Button } from '@components/button/Button';
import { useEventContext } from '@components/home/context/hook/useEventContext';
import { FC } from 'react';

const basicStyles = 'bg-lime-300 text-black hover:bg-lime-400 hover:cursor-pointer';

export const EventCreateButton: FC = () => {
  const { setNewRow } = useEventContext();

  const handleCreateEvent = () => {
    setNewRow(true);
  };

  return (
    <Button onClick={handleCreateEvent} classes={basicStyles}>
      Create Event
    </Button>
  );
};
