import React from 'react';
import PropTypes from 'prop-types';
import styles from './side-bar.module.scss';

export const SideBar = ({ setOpen, isOpen, children }) => {
  return (
    <nav className={styles.sidebar}>
      <div
        className={styles.backdrop}
        onClick={() => setOpen(false)}
        style={{ opacity: isOpen ? '1' : '0', pointerEvents: isOpen ? 'all' : 'none' }}
      />
      <div className={styles.content} style={{ transform: isOpen ? 'translateX(0%)' : 'translateX(-200%)', pointerEvents: 'all' }}>
        {children}
      </div>
    </nav>
  );
};

SideBar.propTypes = {
  isOpen: PropTypes.bool,
  setOpen: PropTypes.func,
};
