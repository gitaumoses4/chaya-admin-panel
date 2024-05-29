import React from 'react';
import {
  IconAffiliateFilled,
  IconLayoutDashboardFilled,
  IconMenu2,
  IconPaintFilled,
  IconProps,
  IconUserCircle,
  IconUsers,
} from '@tabler/icons-react';
import { Button } from './button';

export const MenuItem: React.FC<MenuItemProps> = (props) => {
  return (
    <div className="flex gap-4 hover:bg-brand-50 p-2 items-center rounded-sm cursor-pointer">
      <props.icon className="text-brand-200" />
      <span className="font-light text-sm">{props.title}</span>
    </div>
  );
};

export interface MenuItemProps {
  title: string;
  icon: React.ComponentType<IconProps>;
}

export const SideMenu: React.FC<SideMenuProps> = (props) => {
  return (
    <div className="sm:border-4 sm:border-brand-200 sm:w-48 min-w-60 max-w-[80%] h-full sm:h-auto sm:rounded-xl bg-white">
      <div className="flex items-center justify-between px-4 py-2 border-b border-b-brand-100">
        <h3 className="text-brand font-bold text-xl">Parent</h3>
        <IconMenu2 className="h-6 text-brand sm:block hidden" />
      </div>
      <div className="flex flex-col p-2">
        <MenuItem title="Dashboard" icon={IconLayoutDashboardFilled} />
        <MenuItem title="Users" icon={IconUsers} />
        <MenuItem title="Campaigns" icon={IconAffiliateFilled} />
        <MenuItem title="Creator" icon={IconPaintFilled} />
        <MenuItem title="Profile" icon={IconUserCircle} />
        <div className="p-2">
          <Button className="text-sm py-1">Need Support?</Button>
        </div>
      </div>
    </div>
  );
};

export interface SideMenuProps {}
