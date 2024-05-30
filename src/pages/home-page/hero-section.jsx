import React from 'react';
import background from '../../assets/home-page-background.png';
import girlHeader from '../../assets/girl-header.png';
import boyHeader from '../../assets/boy-header.png';
import styles from './home-page.module.scss';
import superMeLogo from '../../assets/super-me-logo.png';
import { Button } from '../../components/button';

export const HeroSection = (props) => {
  return (
    <section style={{ backgroundImage: `url('${background}')` }} className={styles.heroSection}>
      <div className={styles.heroSectionContainer}>
        <img src={boyHeader} alt="Boy" className={styles.boyHeader} />
        <div className={styles.heroInfo}>
          <img src={superMeLogo} alt="Super Me Logo" className={styles.heroInfoLogo} />
          <h1>Where Children create healthy habits through gamification</h1>
          <Button>Book Demo</Button>
        </div>
        <img src={girlHeader} alt="Girl" className={styles.girlHeader} />
      </div>
    </section>
  );
};
