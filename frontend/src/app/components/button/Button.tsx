'use client';
import { FC, ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  classes: string;
}

export const Button: FC<ButtonProps> = ({ onClick, children, classes }) => {
  const styles = `${classes} px-4 py-2 rounded-md hover`;

  return (
    <button onClick={onClick} className={styles}>
      {children}
    </button>
  );
};
