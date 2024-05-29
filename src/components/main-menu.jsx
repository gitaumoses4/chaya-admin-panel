import React from 'react';
import styles from './main-menu.module.css';
import { Button } from './button';

export const MainMenu = (props) => {
  return (
    <div className={props.isDesktop ? styles.desktopMenu : styles.mobileMenu}>
      <a href="/home">Home</a>
      <a href="/about">About</a>
      <a href="/team">Team</a>
      <a href="/sign-up">Sign Up</a>
      <a href="/login">Login</a>
      <Button>Book Demo</Button>
    </div>
  );
};
