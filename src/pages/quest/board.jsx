import React from 'react';
import styles from './quest.module.scss';
import tileBg from '../../assets/tile-bg.png';
import treeImage from '../../assets/img.png';
import clsx from 'clsx';
import { Button } from '../../components/button';
import modalBg from '../../assets/tile-modal-background.png';
import { motion, useAnimation } from 'framer-motion';
import popup from '../../assets/mission-popup.png';

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

export const TileModal = (props) => {
  return (
    <div className={clsx(styles.tileModal)}>
      <img src={modalBg} alt="" style={{ width: '100%', height: '100%' }} />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1em',
        }}
      >
        <img src={popup} alt="" style={{ width: '100px', height: '100px', marginTop: '-50px' }} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span>To uncover this square:</span>
          <span>master 5 nutrition mission</span>
        </div>
        <Button style={{ background: '#f6db0f', color: 'hsl(var(--brand))' }}>Practice More</Button>
      </div>
    </div>
  );
};

const Tile = (props) => {
  const ref = React.useRef(null);
  const controls = useAnimation();

  React.useEffect(() => {
    if (props.isSelected && !props.locked) {
      controls
        .start({
          rotate: [0, 360],
        })
        .then();
    } else {
      controls.set({ rotate: 0 });
      controls.stop();
    }
  }, [props.isSelected, props.locked]);

  return (
    <motion.div
      animate={controls}
      transition={{ repeat: Infinity, duration: 2 }}
      exit={{ rotate: 0 }}
      className={clsx(styles.tile, {
        [styles.selectedTile]: props.isSelected,
        [styles.unlockedTile]: !props.locked,
        [styles.notCollected]: !props.locked,
      })}
      ref={ref}
    >
      <div
        className={styles.tileInner}
        data-role="tile"
        onClick={(e) => {
          e.stopPropagation();
          props.onClick(e);
        }}
      >
        <img src={tileBg} className={styles.lockedImage}></img>
        <img src={props.image} className={styles.unlockedImage}></img>
      </div>
      <TileModal />
    </motion.div>
  );
};

export const Board = (props) => {
  return (
    <div className={clsx(styles.questBoard, styles.glassBg)}>
      <div className={styles.tilesWrapper}>
        {tiles.map((tile) => (
          <Tile
            {...tile}
            key={tile.id}
            isSelected={tile.id === props.activeTile?.id}
            onClick={(e) => {
              props.onTileClicked(tile);
            }}
          />
        ))}
      </div>
    </div>
  );
};
