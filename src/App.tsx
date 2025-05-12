import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './routers/RootLayout';
import HomePage from './pages/HomePage';
import DetailLayout from './routers/DetailLayout';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    id: 'root',
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/movie/:id', // דף פרטי סרט
        element: <DetailLayout />,
        children: [
          {
            index: true,
            element: <MovieDetailsPage />, // דף פרטי סרט
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
