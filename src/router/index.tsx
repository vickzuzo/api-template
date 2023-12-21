import LoginScreen from '@emedic/pages/Authentication/LoginScreen';
import {createBrowserRouter, Outlet, RouterProvider} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div className="text-lg bg-black text-white w-full h-screen flex items-center justify-center">
        Hello world!
      </div>
    ),
  },
  {
    path: '/auth/*',
    element: (
      <div>
        <h1>AUth Header</h1>
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
  {
    path: '*',
    element: <div>Not found!</div>,
  },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
