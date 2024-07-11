import React from 'react';
import { Button } from '../../components/button';
import { Dialog, Popover } from 'react-aria-components';
import background from '../../assets/tile-modal-background.png';

export const TileUnlockModal = (props) => {
  return (
    <Popover>
      <Dialog>
        <img src={background} alt="" style={{ width: '100%', height: 'auto' }} />
        <div style={{ position: 'absolute', top: 0, width: '100%', height: '100%', left: 0 }}>
          <span>To uncover this square:</span>
          <span>master 5 nutrition mission</span>
          <Button>Practice More</Button>
        </div>
      </Dialog>
    </Popover>
  );
};
