import React from 'react';
import styles from './quest.module.scss';
import boardBackground from '../../assets/quest-side-board-bg.png';
import treasure from '../../assets/quest-treasure.png';
import { ImageBackground } from '../../components/image-background';
import { Button } from '../../components/button';
import { fallingCoins } from './falling-coins';

export const SideBoard = (props) => {
  return (
    <ImageBackground src={boardBackground} className={styles.sideBoard}>
      <img src={treasure} alt="" style={{ position: 'absolute', bottom: 0, width: '100%', height: 'auto' }} />
      <div className={styles.sideBoardContent}>
        {props.activeTile ? (
          <div>
            <p>{!props.activeTile.locked ? props.activeTile.unlock : props.activeTile.otherData}</p>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '1em' }}>
              {!props.activeTile.locked && props.activeTile.goal && <Button onClick={fallingCoins}>Collect</Button>}
            </div>
          </div>
        ) : (
          <div>
            <h2>Quest</h2>
            <p>Click on a tile to see more information</p>
          </div>
        )}
      </div>
    </ImageBackground>
  );
};
