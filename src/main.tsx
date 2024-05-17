import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
// import StudyList from './views/StudyList';
import Viewer from './views/Viewer';
import Login from './views/Login';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    // element: <StudyList />,
    element: <Navigate to="/viewer" replace />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/viewer',
    element: <Viewer />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="relative overflow-hidden h-screen w-screen">
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  </React.StrictMode>
);
