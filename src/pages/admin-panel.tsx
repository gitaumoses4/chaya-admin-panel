import React from 'react';
import { Header } from '../components/header';
import { SideMenu } from '../components/side-menu';
import { Statistics } from '../components/statistics';
import { MissionsTable } from '../components/missions-table';
import { Footer } from '../components/footer';

export const AdminPanel: React.FC<AdminPanelProps> = (props) => {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="flex flex-col bg-brand lg:p-10 p-4">
        <div className="container mx-auto flex flex-col gap-10">
          <section className="h-80 flex gap-10">
            <div className="hidden md:block">
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

export interface AdminPanelProps {}
