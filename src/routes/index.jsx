import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: (
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h1>Login Page</h1>
        <p>Coming soon...</p>
      </div>
    ),
  },
  {
    path: '/signup',
    element: (
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h1>Sign Up Page</h1>
        <p>Coming soon...</p>
      </div>
    ),
  },
]);
