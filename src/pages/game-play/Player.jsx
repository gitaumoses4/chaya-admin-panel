import React, { useMemo, useState } from 'react';
import player from '../../assets/player.png';
import { PLAYER_HEIGHT, PLAYER_SPRITE_POSITIONS, PLAYER_WIDTH } from './constants';

export const Player = ({ position: playerPosition, state, velocity }) => {
  const [frame, setFrame] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setFrame((frame) => frame + 1);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const position = useMemo(() => {
    const position = PLAYER_SPRITE_POSITIONS[state];
    return {
      x: position.start.x - (frame % position.count) * position.step,
      y: position.start.y,
    };
  }, [frame]);

  return (
    <div
      className="absolute"
      style={{
        width: PLAYER_WIDTH,
        height: PLAYER_HEIGHT,
        top: playerPosition.y - PLAYER_HEIGHT,
        left: playerPosition.x - PLAYER_WIDTH / 2,
        transform: velocity.dx < 0 ? 'rotateY(180deg)' : '',
      }}
    >
      <div
        className="w-full h-full"
        style={{
          backgroundImage: `url(${player})`,
          backgroundPosition: `${position.x}px ${position.y}px`,
        }}
      ></div>
    </div>
  );
};
