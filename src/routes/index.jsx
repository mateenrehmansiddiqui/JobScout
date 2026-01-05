import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import SignUpPage from '../pages/SignUpPage';
import LoginPage from '../pages/LoginPage';
import Onboarding from '@pages/Onboarding';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
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
}

]);
