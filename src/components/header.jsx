import React from 'react';
import mainLogo from '../assets/main-logo.png';
import { IconMenu2, IconUserFilled } from '@tabler/icons-react';
import { Button } from './button';
import './header.css';

export const Header = (props) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  return (
    <nav>
      <div className="logo">
        {props.mobileMenu && (
          <Button onClick={() => setSidebarOpen(true)} className="hamburger">
            <IconMenu2 />
          </Button>
        )}
        <img src={mainLogo} alt="Logo" />
      </div>
      {props.desktopMenu}
      {props.user && <IconUserFilled className="profile" />}
      {props.mobileMenu && (
        <div className="menu">
          <div
            className="backdrop"
            onClick={() => setSidebarOpen(false)}
            style={{ opacity: sidebarOpen ? '1' : '0', pointerEvents: sidebarOpen ? 'all' : 'none' }}
          />
          <div className="menu-content" style={{ transform: sidebarOpen ? 'translateX(0%)' : 'translateX(-100%)', pointerEvents: 'all' }}>
            {props.mobileMenu}
          </div>
        </div>
      )}
    </nav>
  );
};
