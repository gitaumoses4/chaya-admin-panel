import React, { useMemo } from 'react';
import bg from '../../assets/game_bg.png';
import { Clouds } from './Clouds';
import { BLOCKS, WORLD_HEIGHT, WORLD_WIDTH } from './constants';
import { Player } from './Player';

export const World = ({ playerPosition, playerState, canvasWidth, playerDirection }) => {
  const worldOffset = useMemo(() => {
    return {
      x: -Math.max(0, playerPosition.x - canvasWidth / 3),
      y: -Math.min(WORLD_HEIGHT - window.innerHeight, playerPosition.y - window.innerHeight / 3),
    };
  }, [playerPosition, canvasWidth]);

  return (
    <div className="absolute" style={{ width: WORLD_WIDTH, height: WORLD_HEIGHT, top: worldOffset.y, left: worldOffset.x }}>
      <img className="w-full h-full absolute left-0 top-0 object-fill" src={bg}></img>
      <Clouds />
      <Player position={playerPosition} state={playerState} direction={playerDirection} />
      {BLOCKS.map((block, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            width: block.width,
            height: '5px',
            top: block.y,
            left: block.x,
            background: 'red',
          }}
        ></div>
      ))}
    </div>
  );
};
