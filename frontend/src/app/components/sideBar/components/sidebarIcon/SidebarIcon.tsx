import Image from 'next/image';
import { FC } from 'react';

interface IconProps {
  icon: string;
}

export const SidebarIcon: FC<IconProps> = ({ icon }) => (
  <div className="p-1 my-2 text-gray-400 hover:text-white cursor-pointer">
    <Image src={`/images/sidebar/${icon}.svg`} alt={`${icon} icon`} width={24} height={24} />
  </div>
);
