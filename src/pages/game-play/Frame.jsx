import React, { useEffect, useRef, useState } from 'react';
import { World } from './World';
import { BLOCKS, GRAVITY, PLAYER_HEIGHT, PLAYER_SPEED, PLAYER_WIDTH, WORLD_HEIGHT } from './constants';

export const Frame = (props) => {
  const frameRef = useRef(null);
  const [block, setBlock] = useState(BLOCKS[2]);

  const [position, setPosition] = useState({ x: block.x + PLAYER_WIDTH / 2, y: block.y });
  const [velocity, setVelocity] = useState({ dx: 0, dy: 0 });
  const [state, setState] = useState('idle');
  const [direction, setDirection] = useState('right');

  useEffect(() => {
    // check whether the player is on the block
    setBlock((block) => {
      if (position.x < block.x || position.x > block.x + block.width) {
        let highestBlock = null;
        BLOCKS.forEach((b) => {
          if (b.x <= position.x && b.x + b.width >= position.x && b.y > position.y) {
            if (!highestBlock || highestBlock.y > b.y) {
              highestBlock = b;
            }
          }
        });
        return highestBlock || block;
      }
      return block;
    });
  }, [position]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((position) => {
        let newVelocity = velocity;

        newVelocity = { dx: velocity.dx, dy: velocity.dy + GRAVITY };

        if (position.y + newVelocity.dy > block.y && position.x > block.x && position.x < block.x + block.width) {
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
      if (e.key === ' ') {
        setState((state) => {
          if (state !== 'jump') {
            setVelocity((velocity) => ({ dx: velocity.dx, dy: -PLAYER_SPEED.jump }));
          }
          return 'jump';
        });
        setDirection('up');
      } else if (e.key === 'ArrowUp') {
        console.log('up');
      } else if (e.key === 'ArrowDown') {
        console.log('down');
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
    <div className="w-full max-w-[1200px] h-full relative overflow-hidden shadow-2xl" ref={frameRef}>
      <World playerPosition={position} playerState={state} canvasWidth={Math.min(window.innerWidth, 1200)} playerDirection={direction} />
    </div>
  );
};
