import React, { useContext, useEffect, useMemo, useRef } from 'react';
import bg from '../../assets/game_bg.png';
import { Clouds } from './Clouds';
import { Player } from './Player';
import { PathObject } from './PathObject';
import { Ladder1 } from './objects/Ladder1';
import { GroundTiles } from './objects/GroundTiles';
import { GameContext } from './GameContext';
import { extractPaths } from './functions';
import { WORLD_HEIGHT, WORLD_WIDTH } from './constants';
import { Bridge1 } from './objects/Bridge1';

export const World = ({ playerPosition, playerState, canvasWidth, playerVelocity }) => {
  const context = useContext(GameContext);
  const tiles = useRef(null);

  const worldOffset = useMemo(() => {
    return !playerPosition
      ? { x: 0, y: -WORLD_HEIGHT + window.innerHeight }
      : {
          x: -Math.max(0, playerPosition.x - canvasWidth / 3),
          y: -Math.min(WORLD_HEIGHT - window.innerHeight, playerPosition.y - window.innerHeight / 3),
        };
  }, [playerPosition, canvasWidth]);

  useEffect(() => {
    console.log(tiles);
    if (tiles.current) {
      context.updatePathObject('ground', { tiles: extractPaths(tiles.current) });
    }
  }, [tiles.current]);

  return (
    <div className="absolute" style={{ width: WORLD_WIDTH, height: WORLD_HEIGHT, top: worldOffset.y + 150, left: worldOffset.x }}>
      <img className="w-full h-full absolute left-0 top-0 object-fill" src={bg}></img>
      <Clouds />
      <PathObject type="ladder" id="ladder1" object={Ladder1} x={169} y={1105} active />
      <PathObject type="bridge" id="bridge1" object={Bridge1} x={437} y={1604} active />
      <GroundTiles ref={tiles} />
      {playerPosition && <Player position={playerPosition} state={playerState} velocity={playerVelocity} />}
    </div>
  );
};
