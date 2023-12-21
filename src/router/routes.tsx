import LoginScreen from '@emedic/pages/Authentication/LoginScreen';
import {Outlet, RouteObject} from 'react-router-dom';

export const protectedPageRoutes: RouteObject[] = [
  {
    path: '',
    element: (
      <div>
        <p>Protected Page</p>
        <Outlet />
      </div>
    ),
    children: [
      {
        path: '',
        element: <div>Protected Page</div>,
      },
    ],
  },
];

export const publicPageRoutes: RouteObject[] = [
  {
    path: '/auth',
    element: (
      <div>
        <p>AUth layout</p>
        <Outlet />
      </div>
    ),
    children: [
      {
        path: 'login',
        element: <LoginScreen />,
      },
    ],
  },
];
