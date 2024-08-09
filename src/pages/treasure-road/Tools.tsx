import React, { PropsWithChildren } from 'react';
import { useDrag } from 'react-dnd';
import ladder from '../../assets/ladder-icon.png';
import rope from '../../assets/rope.png';
import bridge from '../../assets/bridges.png';

export const Tool: React.FunctionComponent<PropsWithChildren<ToolProps>> = (props) => {
  const [collected, drag, dragPreview] = useDrag({
    type: props.type,
    item: { type: props.type },
    collect: (monitor) => ({
      collected: monitor.isDragging(),
    }),
  });
  return (
    <div
      ref={drag}
      style={{ opacity: collected ? 1 : 0 }}
      className="h-12 w-12 bg-brand/50 text-white rounded-md flex flex-col gap-2 justify-center items-center hover:scale-110 transition-all cursor-pointer"
    >
      {props.children}
    </div>
  );
};

interface ToolProps {
  type: string;
}

export const Tools: React.FunctionComponent<ToolsProps> = (props) => {
  return (
    <div className="absolute top-0 right-0 p-4 flex flex-col gap-4 z-20">
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

interface ToolsProps {}
