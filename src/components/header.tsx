import React from 'react';
import mainLogo from '../assets/main-logo.png';
import { IconUserFilled } from '@tabler/icons-react';

export const Header: React.FC<HeaderProps> = (props) => {
  return (
    <nav className="h-16 bg-brand-100 w-full flex px-10 items-center justify-between">
      <img src={mainLogo} alt="Logo" />
      <IconUserFilled className="bg-brand-500 h-12 w-12 p-1 text-brand-100 rounded-full" />
    </nav>
  );
};

export interface HeaderProps {}
