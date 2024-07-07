import React, { useState } from 'react';
import styles from './quest.module.scss';
import { Board } from './board';
import { SideBoard } from './SideBoard';

export const QuestPage = (props) => {
  const [selected, setSelected] = useState();

  return (
    <div className={styles.questPage}>
      <div className={styles.boardWrapper}>
        <Board onTileClicked={(tile) => setSelected(tile)} activeTile={selected} />
        <SideBoard activeTile={selected} />
      </div>
    </div>
  );
};
