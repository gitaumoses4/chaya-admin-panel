import React from 'react';
import styles from './home-page.module.scss';
import { Header } from '../../components/header';
import { MainMenu } from '../../components/main-menu';
import { HeroSection } from './hero-section';
import { CoreValuesSection } from './core-values-section';
import { HowItWorksSection } from './how-it-works-section';
import { WhySection } from './why-section';

export const HomePage = (props) => {
  return (
    <div className={styles.homePage}>
      <Header menu={<MainMenu />} sticky />
      <HeroSection />
      <HowItWorksSection />
      <CoreValuesSection />
      <WhySection />
    </div>
  );
};
