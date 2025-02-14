import MainNavigation from '../components/MainToolBar/MainToolBar';
import { Outlet } from 'react-router-dom';

function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
