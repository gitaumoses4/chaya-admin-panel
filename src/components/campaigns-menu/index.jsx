import React from 'react';
import styles from './campaigns-menu.module.scss';
import campaign from '../../assets/icon-campaign.png';
import achievements from '../../assets/icon-achievements.png';
import learn from '../../assets/icon-learn.png';
import missions from '../../assets/icon-missions.png';
import { Button } from '../button';

export const MenuItem = (props) => {
  return (
    <Button className={styles.menuItem}>
      <img src={props.icon} alt={props.title} />
      <span>{props.title}</span>
    </Button>
  );
};

export const CampaignsMenu = (props) => {
  return (
    <div className={styles.campaignsMenu}>
      <MenuItem icon={campaign} title="Campaign" />
      <MenuItem icon={achievements} title="Achievements" />
      <MenuItem icon={learn} title="Learn" />
      <MenuItem icon={missions} title="Missions" />
    </div>
  );
};
