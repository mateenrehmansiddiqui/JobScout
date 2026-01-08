import { createBrowserRouter } from 'react-router-dom';

// Pages (use ONE style: relative imports)
import LandingPage from '../pages/LandingPage';
import SignUpPage from '../pages/SignUpPage';
import LoginPage from '../pages/LoginPage';
import Onboarding from '../pages/Onboarding';
import Dashboard from '../pages/Dashboard';

// Session pages (make sure file names match exactly)
import ActiveSessionHR from '../pages/ActiveSessionHR';
import ActiveSessionTechnical from '../pages/ActiveSessionTechnical';
import ActiveSessionPanel from '../pages/ActiveSessionPanel';

export const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <SignUpPage /> },
  { path: '/onboarding', element: <Onboarding /> },

  // ✅ Sessions
  { path: '/session/hr', element: <ActiveSessionHR /> },
  { path: '/session/technical', element: <ActiveSessionTechnical /> },
  { path: '/session/panel', element: <ActiveSessionPanel /> },
]);
