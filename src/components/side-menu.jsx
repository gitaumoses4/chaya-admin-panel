import React from 'react';
import { IconAffiliateFilled, IconLayoutDashboardFilled, IconMenu2, IconPaintFilled, IconUserCircle, IconUsers } from '@tabler/icons-react';
import { Button } from './button';
import './side-menu.css';

export const MenuItem = (props) => {
  return (
    <div className="item">
      <props.icon className="icon text-brand-200" />
      <span className="label">{props.title}</span>
    </div>
  );
};

export const SideMenu = (props) => {
  return (
    <div className="side-menu">
      <div className="title">
        <h3 className="text-brand font-bold text-xl">Parent</h3>
        <IconMenu2 className="menu-icon" />
      </div>
      <div className="menu">
        <MenuItem title="Dashboard" icon={IconLayoutDashboardFilled} />
        <MenuItem title="Users" icon={IconUsers} />
        <MenuItem title="Campaigns" icon={IconAffiliateFilled} />
        <MenuItem title="Creator" icon={IconPaintFilled} />
        <MenuItem title="Profile" icon={IconUserCircle} />
        <div style={{ padding: '0.5rem' }}>
          <Button style={{ paddingTop: '0.25rem', paddingBottom: '0.25rem' }}>Need Support?</Button>
        </div>
      </div>
    </div>
  );
};
