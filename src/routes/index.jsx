import { createBrowserRouter } from 'react-router-dom';

// Import all page components using relative paths for reliability
import LandingPage from '../pages/LandingPage';
import SignUpPage from '../pages/SignUpPage';
import LoginPage from '../pages/LoginPage';
import Onboarding from '../pages/Onboarding';
import Dashboard from '../pages/Dashboard';
import NewSessionPage from '../pages/NewSessionPage'; 

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    path: '/onboarding',
    element: <Onboarding />,
  },
  {
    path: '/new-session',
    element: <NewSessionPage />,
  }
]);