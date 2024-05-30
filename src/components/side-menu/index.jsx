import React from 'react';
import { IconAffiliateFilled, IconLayoutDashboardFilled, IconMenu2, IconPaintFilled, IconUserCircle, IconUsers } from '@tabler/icons-react';
import { Button } from '../button';
import styles from './side-menu.module.scss';

export const MenuItem = (props) => {
  return (
    <div className={styles.item}>
      <props.icon className={styles.icon} />
      <span className={styles.label}>{props.title}</span>
    </div>
  );
};

export const SideMenu = (props) => {
  return (
    <div className={styles.sideMenu}>
      <div className={styles.title}>
        <h3>Parent</h3>
        <IconMenu2 className={styles.menuIcon} />
      </div>
      <div className={styles.menu}>
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
