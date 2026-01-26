import { createBrowserRouter } from 'react-router-dom';

// Pages
import LandingPage from '../pages/LandingPage';
import SignUpPage from '../pages/SignUpPage';
import LoginPage from '../pages/LoginPage';
import Onboarding from '../pages/Onboarding';
import Dashboard from '../pages/Dashboard';
import NewSessionPage from '../pages/NewSessionPage';

// Session pages
import ActiveSessionHR from '../pages/ActiveSessionHR';
import ActiveSessionTechnical from '../pages/ActiveSessionTechnical';
import ActiveSessionPanel from '../pages/ActiveSessionPanel';
import SessionResults from '../pages/SessionResults';
import SessionHistory from "../pages/SessionHistory";


export const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <SignUpPage /> },
  { path: '/onboarding', element: <Onboarding /> },
  { path: '/new-session', element: <NewSessionPage /> },

  // ✅ Sessions
  { path: '/session/hr', element: <ActiveSessionHR /> },
  { path: '/session/technical', element: <ActiveSessionTechnical /> },
  { path: '/session/panel', element: <ActiveSessionPanel /> },

  // ✅ Session Results / Feedback Page
  { path: '/session/results', element: <SessionResults /> },
  { path: "/session/history", element: <SessionHistory /> },
  
]);
