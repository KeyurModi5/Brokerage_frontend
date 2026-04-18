import { JSX } from 'react';
import ForgotPassword from './pages/AuthPages/ForgotPassword';
import ResetPassword from './pages/AuthPages/ResetPassword';
import SignIn from './pages/AuthPages/SignIn';
import Home from './pages/Dashboard/Home';
import { Role } from './utils/Constant';

export const routes: {
  path: string;
  element: JSX.Element;
  allowedRoles: string[];
  requiredModule?: string;
}[] = [
    {
      path: '/dashboard',
      element: <Home />,
      allowedRoles: [Role.Admin, Role.Employee],
    },
  ];

export const authRoutes: {
  path: string;
  element: JSX.Element;
}[] = [
    {
      path: '/',
      element: <SignIn />,
    },
    {
      path: '/sign-in',
      element: <SignIn />,
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword />,
    },
    {
      path: '/reset-password',
      element: <ResetPassword />,
    },
  ];
