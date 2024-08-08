import React, { useContext, useEffect, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { GameContext } from './GameContext';
import { extractPaths } from './functions';

export const PathObject = (props) => {
  const { updatePathObject, pathObjects } = useContext(GameContext);
  const state = pathObjects[props.id];
  const svg = useRef();

  const [isDropped, setIsDropped] = React.useState(state.active);
  const [isDropping, setIsDropping] = React.useState(false);

  const [collectedProps, drop] = useDrop({
    accept: props.type,
    drop: (item, monitor) => {
      setIsDropped(true);
      updatePathObject(props.id, { active: true });
    },
    hover: (item, monitor) => {
      setIsDropping(true);
    },
  });

  useEffect(() => {
    setIsDropped(state.active);
  }, [state.active]);

  useEffect(() => {
    if (svg.current) {
      updatePathObject(props.id, { tiles: extractPaths(svg.current), x: props.x, y: props.y, active: props.active });
    }
  }, [svg.current, props.x, props.y, props.active]);

  return (
    <div
      className="absolute"
      ref={drop}
      onDragLeave={() => setIsDropping(false)}
      style={{
        left: state.x,
        opacity: isDropped ? 1 : isDropping ? 0.5 : 0,
        top: state.y,
      }}
    >
      <props.object ref={svg} />
    </div>
  );
};
