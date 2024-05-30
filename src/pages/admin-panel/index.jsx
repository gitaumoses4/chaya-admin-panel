import React from 'react';
import { Header } from '../../components/header';
import { SideMenu } from '../../components/side-menu';
import { Statistics } from '../../components/statistics';
import { MissionsTable } from '../../components/missions-table';
import { Footer } from '../../components/footer';
import styles from './admin-panel.module.scss';

export const AdminPanel = () => {
  return (
    <div className={styles.adminPanel}>
      <Header mobileOnly={true} user menu={<SideMenu />} />
      <main className={styles.main}>
        <div className={styles.mainContent}>
          <section className={styles.section}>
            <div className={styles.sideMenu}>
              <SideMenu />
            </div>
            <Statistics
              list={[
                { value: '15M', title: 'Steps Taken' },
                { value: '21', title: 'Missions Completed' },
                { value: '8', title: 'Nutrition Completed' },
                { value: '5', title: 'Hydration Completed' },
                { value: '3', title: 'Sleep Completed' },
                { value: '2', title: 'Mindfulness Completed' },
                { value: '1', title: 'Exercise Completed' },
              ]}
            />
          </section>
          <MissionsTable title="Verify Missions" verify />
          <MissionsTable title="Today's Completed Missions" />
        </div>
      </main>
      <Footer />
    </div>
  );
};
