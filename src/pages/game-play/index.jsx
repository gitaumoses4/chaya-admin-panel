import React from 'react';
import { Frame } from './Frame';
import background from '../../assets/game_bg.png';
import { Tools } from './Tools';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const GamePlay = (props) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className="bg-brand w-screen h-screen flex justify-center items-center"
        style={{ background: `url(${background})`, backgroundSize: 'cover' }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-md"></div>
        <Frame />
        <Tools />
      </div>
    </DndProvider>
  );
};
