import React from 'react';
import { useDrop } from 'react-dnd';

const createBlocks = ({ steps, x, y, width }) =>
  steps.map((step) => ({
    x1: x,
    y1: y + step,
    x2: x + width,
    y2: y + step,
  }));

export const Ladder = (props) => {
  const [isDropped, setIsDropped] = React.useState(props.active);
  const [isDropping, setIsDropping] = React.useState(false);

  const [collectedProps, drop] = useDrop({
    accept: 'ladder',
    drop: (item, monitor) => {
      setIsDropped(true);
      props.setActive(createBlocks(props));
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
        left: props.x,
        opacity: isDropped ? 1 : isDropping ? 0.5 : 0,
        top: props.y,
        width: props.width,
        height: props.height,
        backgroundImage: `url(${props.image})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
      }}
    ></div>
  );
};
