import React from 'react';
import styles from './footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h1>Our Partners:</h1>
      <p>
        Thank you ------ & ------ for partnering with us on our <b>Mitzvot for Israel</b> campaign.
      </p>
    </footer>
  );
};
