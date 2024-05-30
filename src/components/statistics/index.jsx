import React from 'react';
import styles from './statistics.module.scss';
import { HorizontalScroll } from '../horizontal-scroll';

export const Statistics = (props) => {
  return (
    <HorizontalScroll>
      <div className={styles.statistics}>
        {props.list.map((item) => (
          <div key={item.title} className={styles.item}>
            <div className={styles.circle}>
              <span>{item.value}</span>
            </div>
            <span className={styles.label}>{item.title}</span>
          </div>
        ))}
      </div>
    </HorizontalScroll>
  );
};
