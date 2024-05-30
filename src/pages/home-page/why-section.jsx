import React from 'react';
import styles from './home-page.module.scss';
import quiz from '../../assets/why-quiz.png';
import gameBoard from '../../assets/why-game-board.png';
import achievement from '../../assets/why-achievement.png';

export const WhySection = (props) => {
  return (
    <div className={styles.whySection}>
      <h1>Why Super Me club?</h1>
      <div className={styles.whySectionContainer}>
        <img src={gameBoard} alt={'Game Board'} className={styles.gameBoard} />
        <img src={achievement} alt={'Achievement'} className={styles.achievement} />
        <img src={quiz} alt={'Quiz'} className={styles.quiz} />
      </div>
    </div>
  );
};
