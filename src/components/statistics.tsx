import React from 'react';
import { HorizontalScroll } from './horizontal-scroll';

export const Statistics: React.FC<StatisticsProps> = (props) => {
  return (
    <HorizontalScroll>
      <div className="flex items-start gap-6 sm:gap-10 max-w-7xl">
        {props.list.map((item) => (
          <div key={item.title} className="flex flex-col gap-4 items-center justify-start">
            <div className="h-20 w-20 sm:h-40 sm:w-40 rounded-full border-4 border-white bg-brand-100 flex items-center justify-center">
              <span className="text-3xl sm:text-6xl font-bold text-brand">{item.value}</span>
            </div>
            <span className="text-white font-bold text-md sm:text-lg text-center">{item.title}</span>
          </div>
        ))}
      </div>
    </HorizontalScroll>
  );
};

export interface StatisticsProps {
  list: Array<{ value: string; title: string }>;
}
