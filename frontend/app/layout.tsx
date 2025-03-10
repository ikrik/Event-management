import type { Metadata } from 'next';
import './globals.css';
import { SideBar } from '@components/sideBar/SideBar';

export const metadata: Metadata = {
  title: 'Events Management App',
  description: 'View, Create & Update Events app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex text-white">
        <SideBar />
        <main className="flex-1 p-6 w-full">
          <div className="my-10 mx-auto w-full max-w-[70%] xl:max-w-[85%] md:max-w-[95%]">{children}</div>
        </main>
      </body>
    </html>
  );
}
