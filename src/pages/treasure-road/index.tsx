import React, { useEffect, useMemo, useRef, useState } from 'react';
import p5 from 'p5';
import { GAME_CONFIG } from './game-config';
import background from '../../assets/game_bg.png';
import { Game } from './game';

export const TreasureRoad: React.FunctionComponent<Props> = (props) => {
  const [config] = useState(GAME_CONFIG);

  const ref = useRef(null);

  const Sketch = useMemo(
    () => (p: p5) => {
      let world: Game;

      p.setup = () => {
        world = new Game(p, config);
        world.setup();
      };

      p.draw = () => {
        world.draw();
      };
    },
    [config]
  );

  useEffect(() => {
    if (ref.current) {
      const myp5 = new p5(Sketch, ref.current);
      return () => {
        myp5.remove();
      };
    }
  }, [Sketch]);

  return (
    <div
      className="bg-brand w-screen h-screen flex justify-center items-center"
      style={{ background: `url(${background})`, backgroundSize: 'cover' }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-md z-10"></div>
      <div
        ref={ref}
        className="relative overflow-hidden shadow-2xl z-20"
        style={{ width: config.world.viewPort.width, height: config.world.viewPort.height, bottom: 0 }}
      ></div>
    </div>
  );
};

interface Props {}
