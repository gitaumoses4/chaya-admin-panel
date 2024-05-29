import React, { PropsWithChildren, useCallback } from 'react';
import { twMerge } from 'tailwind-merge';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

export const HorizontalScroll: React.FC<PropsWithChildren<HorizontalScrollProps>> = (props) => {
  const ref = React.useRef<HTMLDivElement>(null);

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
    <div className={twMerge('relative flex items-center overflow-hidden', props.className)}>
      <IconChevronLeft
        className="text-brand-200 h-10 w-10 hover:scale-125 transition-all origin-center cursor-pointer absolute left-0 top-1/3"
        onClick={scrollLeft}
      />
      <div className={twMerge('overflow-x-scroll no-scrollbar px-10')} ref={ref}>
        {props.children}
      </div>
      <IconChevronRight
        className="text-brand-200 h-10 w-10 hover:scale-125 transition-all origin-center cursor-pointer absolute right-0 top-1/3"
        onClick={scrollRight}
      />
    </div>
  );
};

export interface HorizontalScrollProps {
  className?: string;
}
