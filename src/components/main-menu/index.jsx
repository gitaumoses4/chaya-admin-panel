import React from 'react';
import styles from './main-menu.module.scss';
import { Button } from '../button';

export const MainMenu = (props) => {
  return (
    <div className={styles.menu}>
      <a className={styles.link} href="/home">
        Home
      </a>
      <a className={styles.link} href="/about">
        About
      </a>
      <a className={styles.link} href="/team">
        Team
      </a>
      <a className={styles.link} href="/sign-up">
        Sign Up
      </a>
      <a className={styles.link} href="/login">
        Login
      </a>
      <Button>Book Demo</Button>
    </div>
  );
};
