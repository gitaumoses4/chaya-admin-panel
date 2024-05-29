import React from 'react';
import mainLogo from '../assets/main-logo.png';
import { IconMenu2, IconUserFilled } from '@tabler/icons-react';
import { Button } from './button';
import { SideMenu } from './side-menu';

export const Header: React.FC<HeaderProps> = (props) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  return (
    <nav className="h-16 bg-brand-100 w-full flex lg:px-10 px-4 items-center justify-between">
      <div className="flex gap-2">
        <Button onClick={() => setSidebarOpen(true)} className="block sm:hidden">
          <IconMenu2 />
        </Button>
        <img src={mainLogo} alt="Logo" />
      </div>
      <IconUserFilled className="bg-brand-500 h-12 w-12 p-1 text-brand-100 rounded-full" />
      <div className="fixed top-0 left-0 h-full w-full z-10 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-full h-full bg-black/50 transition-opacity"
          onClick={() => setSidebarOpen(false)}
          style={{ opacity: sidebarOpen ? '1' : '0', pointerEvents: sidebarOpen ? 'all' : 'none' }}
        />
        <div
          className="absolute min-w-40 max-w=[80%] h-full z-12 transition-transform"
          style={{ transform: sidebarOpen ? 'translateX(0%)' : 'translateX(-100%)', pointerEvents: 'all' }}
        >
          <SideMenu />
        </div>
      </div>
    </nav>
  );
};

export interface HeaderProps {}
