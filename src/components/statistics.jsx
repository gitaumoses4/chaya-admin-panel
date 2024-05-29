import React from 'react';
import './statistics.css';
import { HorizontalScroll } from './horizontal-scroll';

export const Statistics = (props) => {
  return (
    <HorizontalScroll>
      <div className="statistics">
        {props.list.map((item) => (
          <div key={item.title} className="item">
            <div className="circle">
              <span>{item.value}</span>
            </div>
            <span className="label">{item.title}</span>
          </div>
        ))}
      </div>
    </HorizontalScroll>
  );
};
