import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import StudyList from './views/StudyList';
import Viewer from './views/Viewer';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <StudyList />,
  },
  {
    path: '/viewer',
    element: <Viewer />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="relative overflow-hidden bg-slate-800 h-screen w-screen">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
