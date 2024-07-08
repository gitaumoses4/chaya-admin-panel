import React from 'react';
import styles from './quest.module.scss';
import treasure from '../../assets/quest-treasure.png';
import { Button } from '../../components/button';
import { fallingCoins } from './falling-coins';
import clsx from 'clsx';

export const SideBoard = (props) => {
  return (
    <div className={clsx(styles.sideBoard, styles.glassBg)}>
      <img src={treasure} className={styles.treasureImage} alt="" />
      <div className={styles.sideBoardContent}>
        {props.activeTile ? (
          <div>
            <p>{!props.activeTile.locked ? props.activeTile.unlock : props.activeTile.otherData}</p>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '1em' }}>
              {!props.activeTile.locked && props.activeTile.goal && <Button onClick={() => fallingCoins()}>Collect</Button>}
            </div>
          </div>
        ) : (
          <div>
            <h2>Quest</h2>
            <p>Click on a tile to see more information</p>
          </div>
        )}
      </div>
    </div>
  );
};
