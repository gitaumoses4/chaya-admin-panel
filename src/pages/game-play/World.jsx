import React from 'react';
import { Background } from './Background';
import { Player } from './Player';

export const World = (props) => {
  return (
    <div className="w-full max-w-[1200px] h-full relative overflow-hidden shadow-2xl">
      <Background />
      <Player />
    </div>
  );
};
