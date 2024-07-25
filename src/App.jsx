import React from 'react';
import { HomePage } from './pages/home-page';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AdminPanel } from './pages/admin-panel';
import { UserCampaigns } from './pages/user-campaigns';
import { QuestPage } from './pages/quest';
import { GamePlay } from './pages/game-play';

const router = createBrowserRouter([
  {
    path: '',
    element: <HomePage />,
  },
  {
    path: '/admin',
    element: <AdminPanel />,
  },
  {
    path: '/userCampaigns',
    element: <UserCampaigns />,
  },
  {
    path: '/quest',
    element: <QuestPage />,
  },
  {
    path: '/game-play',
    element: <GamePlay />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
