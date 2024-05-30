import React, { useCallback } from 'react';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import styles from './horizontal-scroll.module.scss';
import clsx from 'clsx';

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
    <div className={clsx(styles.horizontalScroll, props.className)}>
      <IconChevronLeft className={clsx(styles.arrow, styles.leftArrow)} onClick={scrollLeft} />
      <div className={clsx(styles.content, 'no-scrollbar')} ref={ref}>
        {props.children}
      </div>
      <IconChevronRight className={clsx(styles.arrow, styles.rightArrow)} onClick={scrollRight} />
    </div>
  );
};
