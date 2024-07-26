import React, { useEffect, useRef, useState } from 'react';
import { World } from './World';
import { EMPTY_BLOCK, GRAVITY, GROUND_BLOCKS, PLAYER_HEIGHT, PLAYER_SPEED, PLAYER_WIDTH, WORLD_HEIGHT } from './constants';

export const Frame = (props) => {
  const [containers, setContainers] = useState([{ id: 'ground', blocks: GROUND_BLOCKS }]);
  const frameRef = useRef(null);
  const [block, setBlock] = useState(containers[0].blocks[0]);
  const [ladder1Active, setLadder1Active] = useState(false);

  const [position, setPosition] = useState({ x: block.x1 + PLAYER_WIDTH / 2, y: block.y1 });
  const [velocity, setVelocity] = useState({ dx: 0, dy: 0 });
  const [state, setState] = useState('idle');
  const [direction, setDirection] = useState('right');

  useEffect(() => {
    // check whether the player is on the block
    setBlock((block) => {
      if (position.x < block.x1 || position.x > block.x2 || block.y1 > position.y) {
        let highestBlock = null;

        for (let container of containers) {
          container.blocks.forEach((b) => {
            console.log(container.id, b, position);
            if (b.x1 <= position.x && b.x2 >= position.x && b.y1 >= position.y) {
              if (!highestBlock || highestBlock.y1 > b.y1) {
                highestBlock = b;
              }
            }
          });
        }
        return highestBlock || block;
      }
      return block;
    });
  }, [position, containers]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((position) => {
        let newVelocity = velocity;

        newVelocity = { dx: velocity.dx, dy: velocity.dy + GRAVITY };

        if (position.y + newVelocity.dy > block.y1 && position.x > block.x1 && position.x < block.x2) {
          if (state === 'jump') {
            newVelocity = { dx: 0, dy: 0 };
            setState('idle');
          } else {
            newVelocity = { dx: velocity.dx, dy: 0 };
          }
        }

        if (position.y > WORLD_HEIGHT + PLAYER_HEIGHT) {
          newVelocity = { dx: 0, dy: 0 };
        }

        setVelocity(newVelocity);

        return { x: position.x + newVelocity.dx, y: position.y + newVelocity.dy };
      });
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [velocity, state, block]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ' ' || e.key === 'ArrowUp') {
        setState((state) => {
          if (state !== 'jump') {
            setVelocity((velocity) => ({ dx: velocity.dx, dy: -PLAYER_SPEED.jump }));
          }
          return 'jump';
        });
        setDirection('up');
      } else if (e.key === 'ArrowDown') {
        setVelocity((velocity) => ({ dx: velocity.dx, dy: GRAVITY }));
        setDirection('down');
        setState('jump');
        setBlock(EMPTY_BLOCK);
      } else if (e.key === 'ArrowLeft') {
        setVelocity((velocity) => ({ dx: -PLAYER_SPEED.run, dy: velocity.dy }));
        setState((state) => {
          return state === 'jump' ? 'jump' : 'run';
        });
        setDirection('left');
      } else if (e.key === 'ArrowRight') {
        setVelocity((velocity) => {
          return { dx: PLAYER_SPEED.run, dy: velocity.dy };
        });
        setState((state) => {
          return state === 'jump' ? 'jump' : 'run';
        });
        setDirection('right');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state]);

  useEffect(() => {
    const handleKeyUp = (e) => {
      if (state === 'run') {
        setState('idle');
        setVelocity({ dx: 0, dy: 0 });
      }
    };

    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [state]);

  return (
    <div className="w-full max-w-[1400px] h-full relative overflow-hidden shadow-2xl" ref={frameRef}>
      <World
        playerPosition={position}
        playerState={state}
        canvasWidth={Math.min(window.innerWidth, 1400)}
        playerDirection={direction}
        ladder1Active={ladder1Active}
        addContainer={(container) => setContainers((containers) => [...containers, container])}
        containers={containers}
      />
    </div>
  );
};
