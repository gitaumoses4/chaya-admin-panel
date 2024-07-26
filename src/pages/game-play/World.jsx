import React, { useMemo } from 'react';
import bg from '../../assets/game_bg.png';
import { Clouds } from './Clouds';
import { WORLD_HEIGHT, WORLD_WIDTH } from './constants';
import { Player } from './Player';
import { Ladder } from './ladder';
import ladder1 from '../../assets/ladder-1.png';
import ladder2 from '../../assets/ladder-2.png';

export const World = ({ playerPosition, playerState, canvasWidth, playerDirection, addContainer, ladder1Active, ladder2Active, containers }) => {
  const worldOffset = useMemo(() => {
    return {
      x: -Math.max(0, playerPosition.x - canvasWidth / 3),
      y: -Math.min(WORLD_HEIGHT - window.innerHeight, playerPosition.y - window.innerHeight / 3),
    };
  }, [playerPosition, canvasWidth]);

  return (
    <div className="absolute" style={{ width: WORLD_WIDTH, height: WORLD_HEIGHT, top: worldOffset.y + 150, left: worldOffset.x }}>
      <img className="w-full h-full absolute left-0 top-0 object-fill" src={bg}></img>
      <Clouds />
      <Ladder
        active={ladder1Active}
        setActive={(blocks) => addContainer({ id: 'ladder1', blocks })}
        x={169}
        y={1144}
        width={130}
        height={600}
        steps={[27, 97, 176, 249, 321, 395, 473, 544]}
        image={ladder1}
      />
      <Ladder
        active={ladder2Active}
        setActive={(blocks) => addContainer({ id: 'ladder2', blocks })}
        x={1731}
        y={1000}
        width={130}
        height={420}
        steps={[51, 120, 200, 278, 354]}
        image={ladder2}
      />
      {containers.map((container) =>
        container.blocks.map((block, index) => (
          <div
            key={container.id + index}
            className="absolute"
            style={{
              display: 'none',
              width: block.x2 - block.x1,
              height: block.y2 - block.y1,
              top: block.y2,
              left: block.x1,
            }}
          >
            <span
              className="absolute"
              style={{
                width: Math.sqrt((block.x2 - block.x1) ** 2 + (block.y2 - block.y1) ** 2),
                height: '5px',
                backgroundColor: 'red',
                transform: `rotate(${Math.atan2(block.y2 - block.y1, block.x2 - block.x1)}rad)`,
              }}
            />
          </div>
        ))
      )}
      <Player position={playerPosition} state={playerState} direction={playerDirection} />
    </div>
  );
};
