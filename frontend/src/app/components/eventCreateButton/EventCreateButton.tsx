'use client';

import { Button } from '@components/button/Button';
import { FC } from 'react';

const basicStyles = 'bg-lime-300 text-black hover:bg-lime-400 hover:cursor-pointer';

export const EventCreateButton: FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <Button onClick={onClick} classes={basicStyles}>
      Create Event
    </Button>
  );
};
