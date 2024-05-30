import React from 'react';
import styles from './button.module.scss';

export const Button = (props) => {
  return (
    <button {...props} className={styles.button + ' ' + props.className}>
      {props.children}
    </button>
  );
};
