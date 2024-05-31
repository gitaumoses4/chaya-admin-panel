import React from 'react';
import { HomePage } from './pages/home-page';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AdminPanel } from './pages/admin-panel';
import { UserCampaigns } from './pages/user-campaigns';

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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
