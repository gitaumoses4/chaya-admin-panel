import React, { useEffect, useMemo, useRef, useState } from 'react';
import p5 from 'p5';
import { GAME_CONFIG, GameConfig } from './game-config';
import background from '../../assets/game_bg.png';
import { Game } from './game';
import { Tools } from './Tools';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider, useDrop } from 'react-dnd';

const Canvas: React.FC<CanvasProps> = ({ config }) => {
  const ref = useRef(null);
  const gameInstance = useRef<Game | null>(null);

  const [props, drop] = useDrop({
    accept: ['ladder', 'bridge'],
    drop: (item, monitor) => {
      if (gameInstance.current) {
        gameInstance.current?.dropTool((item as any).type);
      }
    },
    hover: (item, monitor) => {
      console.log(item, monitor);
    },
  });

  console.log(props);

  const Sketch = useMemo(
    () => (p: p5) => {
      let game: Game;

      p.setup = () => {
        game = new Game(p, config);
        gameInstance.current = game;
        game.setup();
      };

      p.draw = () => {
        game.draw();
      };
    },
    [config]
  );

  useEffect(() => {
    if (ref.current) {
      drop(ref.current);
      const myp5 = new p5(Sketch, ref.current);
      return () => {
        myp5.remove();
      };
    }
  }, [Sketch, drop]);
  return (
    <div
      ref={ref}
      className="relative overflow-hidden shadow-2xl z-20"
      style={{ width: config.world.viewPort.width, height: config.world.viewPort.height, bottom: 0 }}
    ></div>
  );
};

interface CanvasProps {
  config: GameConfig;
}

export const TreasureRoad: React.FunctionComponent<Props> = (props) => {
  const [config] = useState(GAME_CONFIG);

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className="bg-brand w-screen h-screen flex justify-center items-center"
        style={{ background: `url(${background})`, backgroundSize: 'cover' }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-md z-10"></div>
        <Canvas config={config} />
        <Tools />
      </div>
    </DndProvider>
  );
};

interface Props {}
