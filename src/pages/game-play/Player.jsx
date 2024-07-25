import React, { useMemo, useState } from 'react';
import player from '../../assets/player.png';

const width = 64;
const height = 72;

const positions = {
  idle: {
    start: { x: -96, y: -20 },
    step: 80,
    count: 6,
  },
  walk: {
    start: { x: -96, y: -112 },
    step: 80,
    count: 7,
  },
  run: {
    start: { x: -96, y: -209 },
    step: 80,
    count: 8,
  },
  jump: {
    start: { x: -96, y: -298 },
    step: 82,
    count: 8,
  },
};

export const Player = (props) => {
  const [state, setState] = useState('jump');

  const [frame, setFrame] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setFrame((frame) => frame + 1);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const position = useMemo(() => {
    const position = positions[state];
    return {
      x: position.start.x - (frame % position.count) * position.step,
      y: position.start.y,
    };
  }, [frame]);

  return (
    <div className="absolute top-0 left-0" style={{ width, height }}>
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
