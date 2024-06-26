import React from 'react';
import mainLogo from '../../assets/main-logo.png';
import { IconMenu2, IconUserFilled } from '@tabler/icons-react';
import { Button } from '../button';
import { SideBar } from '../side-bar';
import styles from './header.module.scss';
import clsx from 'clsx';

export const Header = (props) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  return (
    <nav
      className={clsx(styles.nav, {
        [styles.sticky]: props.sticky,
      })}
    >
      <div className={styles.logo}>
        {props.menu && (
          <Button onClick={() => setSidebarOpen(true)} className={styles.hamburger}>
            <IconMenu2 />
          </Button>
        )}
        <img src={mainLogo} alt="Logo" />
      </div>
      <div className={styles.rightContent}>
        <div className={styles.menu}>{!props.mobileOnly && props.menu}</div>
        {props.user && <IconUserFilled className={styles.profile} />}
        {props.menu && (
          <SideBar isOpen={sidebarOpen} setOpen={setSidebarOpen}>
            {props.menu}
          </SideBar>
        )}
      </div>
    </nav>
  );
};

Header.defaultProps = {};
