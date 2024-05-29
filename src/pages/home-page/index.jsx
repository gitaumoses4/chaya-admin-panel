import React from 'react';
import styles from './home-page.module.css';
import { Header } from '../../components/header';
import { MainMenu } from '../../components/main-menu';
import { HeroSection } from './hero-section';

export const HomePage = (props) => {
  return (
    <div className={styles.homePage}>
      <Header showsMenu mobileMenu={<MainMenu />} desktopMenu={<MainMenu isDesktop />} />
      <HeroSection />
      <div></div>
    </div>
  );
};
