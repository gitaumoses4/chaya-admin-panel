import React from 'react';
import styles from './quest.module.scss';
import tileBg from '../../assets/tile-bg.png';
import treeImage from '../../assets/img.png';
import boardBg from '../../assets/quest-board-bg.png';
import clsx from 'clsx';

const tiles = [
  ...Array(10).fill({
    locked: true,
    image: treeImage,
    unlock: 'Complete tile ids',
    goal: true,
    otherData: 'This is shown when locked',
  }),
  ...Array(3).fill({
    locked: false,
    image: treeImage,
    unlock: 'Complete tile ids',
    goal: true,
  }),
  ...Array(12).fill({
    locked: true,
    image: treeImage,
    unlock: 'Complete tile ids',
    goal: true,
  }),
]
  .map((value) => ({ ...value, id: Math.random() }))
  .sort((a, b) => a.id - b.id);

const Tile = (props) => {
  return (
    <div onClick={props.onClick} className={clsx(styles.tile, { [styles.selectedTile]: props.isSelected, [styles.unlockedTile]: !props.locked })}>
      <div className={styles.tileInner}>
        <img src={tileBg} className={styles.lockedImage}></img>
        <img src={props.image} className={styles.unlockedImage}></img>
      </div>
    </div>
  );
};

export const Board = (props) => {
  return (
    <div className={styles.questBoard}>
      <img src={boardBg} alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      <div className={styles.tilesWrapper}>
        {tiles.map((tile) => (
          <Tile {...tile} key={tile.id} isSelected={tile.id === props.activeTile?.id} onClick={() => props.onTileClicked(tile)} />
        ))}
      </div>
    </div>
  );
};
