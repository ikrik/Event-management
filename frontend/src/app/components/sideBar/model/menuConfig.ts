export interface SidebarItem {
  icon: string;
  fullName: string;
  route: string;
}

export const MENU_CONFIG: SidebarItem[] = [
  {
    icon: 'home',
    fullName: 'Home',
    route: '/',
  },
  {
    icon: 'notification',
    fullName: 'Notifications',
    route: '/notifications',
  },
  {
    icon: 'contact',
    fullName: 'Contact',
    route: '/contact',
  },
  {
    icon: 'settings',
    fullName: 'Setting',
    route: '/settings',
  },
];
