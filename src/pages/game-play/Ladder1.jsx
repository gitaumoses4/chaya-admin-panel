import React from 'react';
import ladder from '../../assets/ladder-1.png';
import { useDrop } from 'react-dnd';

export const Ladder1 = (props) => {
  const [isDropped, setIsDropped] = React.useState(false);
  const [isDropping, setIsDropping] = React.useState(false);

  const [collectedProps, drop] = useDrop({
    accept: 'ladder',
    drop: (item, monitor) => {
      setIsDropped(true);
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
        left: 169,
        opacity: isDropped ? 1 : isDropping ? 0.5 : 0,
        top: 1144,
        width: 130,
        height: 600,
        backgroundImage: `url(${ladder})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
      }}
    ></div>
  );
};
