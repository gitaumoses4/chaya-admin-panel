import React from 'react';
import PropTypes from 'prop-types';
import styles from './side-bar.module.scss';
import clsx from 'clsx';
import { IconX } from '@tabler/icons-react';

export const SideBar = ({ setOpen, isOpen, children, className, contentClassName, closeIconClassName, showCloseIcon }) => {
  return (
    <nav className={clsx(styles.sidebar, className)}>
      <div
        className={styles.backdrop}
        onClick={() => setOpen(false)}
        style={{ opacity: isOpen ? '1' : '0', pointerEvents: isOpen ? 'all' : 'none' }}
      />
      {showCloseIcon && <IconX className={clsx(styles.closeIcon, closeIconClassName)} onClick={() => setOpen(false)} />}
      <div
        className={clsx(styles.content, contentClassName)}
        style={{ transform: isOpen ? 'translateX(0%)' : 'translateX(-200%)', pointerEvents: 'all' }}
      >
        {children}
      </div>
    </nav>
  );
};

SideBar.propTypes = {
  isOpen: PropTypes.bool,
  setOpen: PropTypes.func,
  className: PropTypes.string,
  contentClassName: PropTypes.string,
  showCloseIcon: PropTypes.bool,
  closeIconClassName: PropTypes.string,
};
