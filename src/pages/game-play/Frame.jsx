import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { World } from './World';
import { EMPTY_TILE, GRAVITY, PLAYER_HEIGHT, PLAYER_SPEED, PLAYER_WIDTH, WORLD_HEIGHT } from './constants';
import { GameContext } from './GameContext';
import { checkPositionInTile } from './functions';

export const Frame = (props) => {
  const context = useContext(GameContext);
  const frameRef = useRef(null);
  const [tile, setTile] = useState(null);

  const [position, setPosition] = useState(null);
  const [velocity, setVelocity] = useState({ dx: 0, dy: 0 });
  const [state, setState] = useState('idle');

  useEffect(() => {
    if (tile == null && context.pathObjects.ground.tiles.length) {
      const firstTile = context.pathObjects.ground.tiles[0];
      setPosition({ x: firstTile.x1 + PLAYER_WIDTH / 2, y: firstTile.y1 });
      setTile(firstTile);
    }
  }, [context.pathObjects, tile]);

  const updateVelocity = useCallback((newVelocity) => {
    setVelocity((velocity) => ({ ...velocity, ...newVelocity }));
  }, []);

  useEffect(() => {
    // check whether the player is on the tile
  }, [position, context.pathObjects, velocity]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((position) => {
        if (!position || !tile) return position;
        let newVelocity = velocity;

        newVelocity = { dx: velocity.dx, dy: velocity.dy + GRAVITY };

        const firstPosition = checkPositionInTile(tile, { x: position.x, y: position.y });
        const nextPosition = checkPositionInTile(tile, { x: position.x + newVelocity.dx, y: position.y + newVelocity.dy });

        if (firstPosition !== 'below' && nextPosition !== 'above' && position.x >= tile.x1 && position.x <= tile.x2) {
          // use the gradient of the tile to calculate the new dy
          const gradient = (tile.y2 - tile.y1) / (tile.x2 - tile.x1);
          const angle = Math.atan(gradient);
          const newDy = Math.tan(angle) * velocity.dx;

          newVelocity = { dx: velocity.dx, dy: newDy };

          if (state === 'jump') {
            setState('idle');
            newVelocity = { dx: 0, dy: 0 };
          }
        }

        if (position.y > WORLD_HEIGHT + PLAYER_HEIGHT) {
          newVelocity = { dx: 0, dy: 0 };
        }

        const newPosition = { x: position.x + newVelocity.dx, y: position.y + newVelocity.dy };

        let highestBlock = tile;

        let count = 0;

        for (let container of Object.values(context.pathObjects)) {
          container.tiles.forEach((b) => {
            const check = checkPositionInTile(b, newPosition);
            if (b.x2 === 469) {
              console.log(check);
            }
            if (check !== 'below' && b.x1 <= newPosition.x && b.x2 >= newPosition.x) {
              count++;
              if (!highestBlock || highestBlock.y1 >= b.y1) {
                highestBlock = b;
              }
            }
          });
        }

        console.log(count);

        if (highestBlock) {
          setTile(highestBlock);
        }

        setVelocity(newVelocity);

        return newPosition;
      });
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [velocity, state, tile, context.pathObjects]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ' ' || e.key === 'ArrowUp') {
        setState((state) => {
          if (state !== 'jump') {
            updateVelocity({ dy: -PLAYER_SPEED.jump });
          }
          return 'jump';
        });
      } else if (e.key === 'ArrowDown') {
        updateVelocity({ dy: GRAVITY });
        setState('jump');
        setTile(EMPTY_TILE);
      } else if (e.key === 'ArrowLeft') {
        updateVelocity({ dx: -PLAYER_SPEED.run });
        setState((state) => {
          return state === 'jump' ? 'jump' : 'run';
        });
      } else if (e.key === 'ArrowRight') {
        updateVelocity({ dx: PLAYER_SPEED.run });
        setState((state) => {
          return state === 'jump' ? 'jump' : 'run';
        });
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
        playerVelocity={velocity}
        initializing={tile === null}
      />
    </div>
  );
};
