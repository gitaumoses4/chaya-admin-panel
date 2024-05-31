import React from 'react';
import styles from './user-campaigns.module.scss';
import background from '../../assets/campaign-card-background.png';
import stars from '../../assets/stars.png';
import gold from '../../assets/trophy-gold.png';
import silver from '../../assets/trophy-silver.png';
import bronze from '../../assets/trophy-bronze.png';
import { campaignsData } from '../../data';
import useBreakpoint from '../../hooks/use-breakpoint';

const trophies = [gold, silver, bronze];

export const Trophy = (props) => {
  if (props.number <= 3) {
    return (
      <div className={styles.trophy}>
        <img src={trophies[props.number - 1]} alt="Trophy" />
      </div>
    );
  }

  return <div className={styles.noTrophy}>{props.number}</div>;
};

export const CampaignsCard = ({ campaigns }) => {
  return (
    <div className={styles.campaignsCard}>
      <img src={background} alt="Background" className={styles.background} />
      <img src={stars} alt="Stars" className={styles.stars} />
      <div className={styles.campaigns}>
        {campaigns.map((campaign) => (
          <div key={campaign.id} className={styles.campaign}>
            <div className={styles.campaignTitle}>{campaign.name}</div>
            <div className={styles.leaderboard}>
              {campaign.leaderboard.map((name, index) => (
                <div key={name} className={styles.leaderboardItem}>
                  <Trophy number={index + 1} />
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Campaigns = (props) => {
  const { breakpoint } = useBreakpoint();

  if (breakpoint === 'mobile') {
    return (
      <div className={styles.mobileCampaigns}>
        {campaignsData.map((campaign) => (
          <CampaignsCard campaigns={[campaign]} />
        ))}
      </div>
    );
  }

  return <CampaignsCard campaigns={campaignsData} />;
};
