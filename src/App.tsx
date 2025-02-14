import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './routers/RootLayout';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      id: 'root',
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
