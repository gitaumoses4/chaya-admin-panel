import React from 'react';
import styles from './home-page.module.scss';
import feelGreat from '../../assets/value-feel-great.png';
import buildResilience from '../../assets/value-build-resilience.png';
import spreadKindness from '../../assets/value-spread-kindness.png';

export const CoreValuesSection = (props) => {
  return (
    <div className={styles.coreValuesSection}>
      <h1 className={styles.header}>Our core values</h1>
      <div className={styles.values}>
        <img src={feelGreat} alt="Feel great" />
        <img src={buildResilience} alt="Build Resilience" />
        <img src={spreadKindness} alt="Spread Kindness" />
      </div>
    </div>
  );
};
