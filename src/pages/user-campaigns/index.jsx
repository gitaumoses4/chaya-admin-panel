import React from 'react';
import styles from './user-campaigns.module.scss';
import { Header } from '../../components/header';
import { CampaignsMenu } from '../../components/campaigns-menu';
import { Campaigns } from './campaigns-card';
import background from '../../assets/campaigns-background.jpg';
import girl from '../../assets/girl-full.png';
import boy from '../../assets/boy-full.png';

export const UserCampaigns = (props) => {
  return (
    <div className={styles.userCampaigns}>
      <Header user menu={<CampaignsMenu />} />
      <div className={styles.userCampaignsSection} style={{ backgroundImage: `url(${background})` }}>
        <img src={boy} alt="Boy" className={styles.boy} />
        <Campaigns />
        <img src={girl} alt="Girl" className={styles.girl} />
      </div>
    </div>
  );
};
