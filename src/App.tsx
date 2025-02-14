import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './routers/RootLayout';
import HomePage from './pages/HomePage';
function App() {
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

  return <RouterProvider router={router} />;
}

export default App;
