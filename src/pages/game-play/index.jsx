import React, { useCallback } from 'react';
import { Frame } from './Frame';
import background from '../../assets/game_bg.png';
import { Tools } from './Tools';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { GameContext } from './GameContext';

export const GamePlay = (props) => {
  const [pathObjects, setPathObjects] = React.useState({
    ground: {
      active: true,
      tiles: [],
    },
    ladder1: {
      active: false,
      tiles: [],
    },
    ladder2: {
      active: false,
      tiles: [],
    },
    bridge1: {
      active: false,
      tiles: [],
    },
  });

  const updateTiles = useCallback((pathObject, tiles) => {
    if (tiles?.length) {
      return tiles.map((tile) => ({
        x1: (pathObject.x || 0) + tile.x1,
        x2: (pathObject.x || 0) + tile.x2,
        y1: (pathObject.y || 0) + tile.y1,
        y2: (pathObject.y || 0) + tile.y2,
      }));
    }
    return pathObject.tiles;
  }, []);

  const updatePathObject = useCallback((key, state) => {
    setPathObjects((pathObjects) => {
      return { ...pathObjects, [key]: { ...pathObjects[key], ...state, tiles: updateTiles(pathObjects[key], state.tiles) } };
    });
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <GameContext.Provider value={{ pathObjects, updatePathObject }}>
        <div
          className="bg-brand w-screen h-screen flex justify-center items-center"
          style={{ background: `url(${background})`, backgroundSize: 'cover' }}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-md"></div>
          <Frame />
          <Tools />
        </div>
      </GameContext.Provider>
    </DndProvider>
  );
};
