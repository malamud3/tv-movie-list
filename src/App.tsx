import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './routers/RootLayout';
import HomePage from './pages/HomePage';

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
