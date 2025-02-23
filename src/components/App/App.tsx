import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SearchApp } from '../SearchApp/SearchApp';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import { Details } from '../Details/Details';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SearchApp />,
    children: [
      {
        path: 'details/:itemId',
        element: <Details />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
