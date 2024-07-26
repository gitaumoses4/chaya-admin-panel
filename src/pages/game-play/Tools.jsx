import React from 'react';
import { useDrag } from 'react-dnd';
import ladder from '../../assets/ladder-icon.png';
import rope from '../../assets/rope.png';
import bridge from '../../assets/bridges.png';

export const Tool = (props) => {
  const [collected, drag, dragPreview] = useDrag({
    type: props.type,
    collect: (monitor) => ({
      collected: !!monitor.isDragging(),
    }),
  });
  return (
    <div
      ref={drag}
      style={{ opacity: collected ? 1 : 0 }}
      className="h-12 w-12 bg-brand/50 text-white rounded-md flex flex-col gap-2 justify-center items-center"
    >
      {props.children}
    </div>
  );
};

export const Tools = (props) => {
  return (
    <div className="absolute top-0 right-0 p-4 flex flex-col gap-4">
      <Tool type="ladder">
        <img src={ladder} className="w-auto h-8" />
      </Tool>
      <Tool type="bridge">
        <img src={bridge} className="w-auto h-8" />
      </Tool>
      <Tool type="rope">
        <img src={rope} className="w-auto h-8" />
      </Tool>
    </div>
  );
};
