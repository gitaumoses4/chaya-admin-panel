import React from 'react';
import styles from './shooting-stars.module.scss';
import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';

/**
 * An animated div that moves from the center to a random direction out of the screen
 */
export const ShootingStars = (props) => {
  const stars = Array(props.count)
    .fill(0)
    .map(() => (
      <motion.div
        animate={{ x: [0, Math.random() * 1000 - 500], y: [0, Math.random() * 1000 - 500], opacity: [1, 0] }}
        transition={{ duration: 2, delay: Math.random() * 5, repeat: Infinity }}
        className={styles.shootingStar}
      ></motion.div>
    ));

  return <div className={styles.shootingStars}>{stars}</div>;
};

export const CollectTile = (props) => {
  if (props.locked || !props.isSelected) {
    return null;
  }
  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <motion.div animate={{ opacity: [0, 1] }} transition={{ duration: 2 }} className={styles.backdrop} onClick={props.onClick}></motion.div>
      <motion.div
        animate={{ scale: [0, 1] }}
        transition={{ duration: 1 }}
        className={styles.tile}
        onClick={(e) => {
          e.stopPropagation();
          props.onClick(e);
        }}
      >
        <ShootingStars count={50} />
        <motion.img
          animate={{ rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: 1 }}
          src={props.image}
          className={styles.image}
        ></motion.img>
      </motion.div>
    </div>,
    document.body
  );
};
