import Image from 'next/image';
import { SidebarIcon } from './components/sidebarIcon/SidebarIcon';
import { MENU_CONFIG } from './model/menuConfig';
import Link from 'next/link';

export const SideBar = () => (
  <aside className="w-20 h-screen bg-[#111111] flex flex-col items-center p-4">
    <div className="mb-4">
      <Image src="/logo.png" alt="Reydix logo" width={40} height={40} />
    </div>
    <div className="flex-1 flex flex-col justify-center">
      {MENU_CONFIG.map((menu) => (
        <Link key={menu.fullName} href={menu.route}>
          <SidebarIcon icon={menu.icon} />
        </Link>
      ))}
    </div>
  </aside>
);
