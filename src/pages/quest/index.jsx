import React, { useState } from 'react';
import styles from './quest.module.scss';
import { Board } from './board';
import { SideBoard } from './SideBoard';

export const QuestPage = (props) => {
  const [selected, setSelected] = useState();

  return (
    <div
      className={styles.questPage}
      onClick={(e) => {
        if (e.target.getAttribute('data-role') !== 'tile') {
          setSelected(null);
        }
      }}
    >
      <div className={styles.boardWrapper}>
        <Board onTileClicked={(tile) => setSelected(tile)} activeTile={selected} />
        <SideBoard activeTile={selected} />
      </div>
    </div>
  );
};
