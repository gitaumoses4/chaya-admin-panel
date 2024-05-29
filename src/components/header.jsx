import React from 'react';
import mainLogo from '../assets/main-logo.png';
import { IconMenu2, IconUserFilled } from '@tabler/icons-react';
import { Button } from './button';
import { SideMenu } from './side-menu';
import './header.css';

export const Header = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  return (
    <nav>
      <div className="logo">
        <Button onClick={() => setSidebarOpen(true)} className="hamburger">
          <IconMenu2 />
        </Button>
        <img src={mainLogo} alt="Logo" />
      </div>
      <IconUserFilled className="profile" />
      <div className="menu">
        <div
          className="backdrop"
          onClick={() => setSidebarOpen(false)}
          style={{ opacity: sidebarOpen ? '1' : '0', pointerEvents: sidebarOpen ? 'all' : 'none' }}
        />
        <div className="menu-content" style={{ transform: sidebarOpen ? 'translateX(0%)' : 'translateX(-100%)', pointerEvents: 'all' }}>
          <SideMenu />
        </div>
      </div>
    </nav>
  );
};
