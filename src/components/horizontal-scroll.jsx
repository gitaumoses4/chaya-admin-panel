import React, { useCallback } from 'react';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import './horizontal-scroll.css';

export const HorizontalScroll = (props) => {
  const ref = React.useRef(null);

  const scrollLeft = useCallback(() => {
    if (ref.current) {
      ref.current.scrollBy({ left: -40, behavior: 'smooth' });
    }
  }, []);

  const scrollRight = useCallback(() => {
    if (ref.current) {
      ref.current.scrollBy({ left: 40, behavior: 'smooth' });
    }
  }, []);

  return (
    <div className={'horizontal-scroll ' + props.className}>
      <IconChevronLeft className="arrow left-arrow" onClick={scrollLeft} />
      <div className="content no-scrollbar" ref={ref}>
        {props.children}
      </div>
      <IconChevronRight className="arrow right-arrow" onClick={scrollRight} />
    </div>
  );
};
