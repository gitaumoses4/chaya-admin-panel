import React from 'react';
import ladder from '../../assets/ladder-1.png';
import { useDrop } from 'react-dnd';

const LADDER_X = 169;
const LADDER_Y = 1144;
const LADDER_WIDTH = 130;
const LADDER_HEIGHT = 600;
const LADDER_STEP = 90;
const LADDER_STEP_START = 20;

const BLOCKS = Array.from({ length: 7 }, (_, i) => {
  return {
    x: LADDER_X,
    y: LADDER_STEP_START + LADDER_Y - i * LADDER_STEP,
    width: LADDER_WIDTH,
  };
});

export const Ladder1 = (props) => {
  const [isDropped, setIsDropped] = React.useState(props.active);
  const [isDropping, setIsDropping] = React.useState(false);

  const [collectedProps, drop] = useDrop({
    accept: 'ladder',
    drop: (item, monitor) => {
      setIsDropped(true);
      props.setActive(BLOCKS);
    },
    hover: (item, monitor) => {
      setIsDropping(true);
    },
  });

  return (
    <div
      className="absolute"
      ref={drop}
      onDragLeave={() => setIsDropping(false)}
      style={{
        left: LADDER_X,
        opacity: isDropped ? 1 : isDropping ? 0.5 : 0,
        top: LADDER_Y,
        width: LADDER_WIDTH,
        height: LADDER_HEIGHT,
        backgroundImage: `url(${ladder})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
      }}
    ></div>
  );
};
