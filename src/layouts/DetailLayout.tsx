import { Outlet } from 'react-router-dom';
import NavigationDetails from '../components/NavigationDetails/NavigationDetails';

function DetailLayout() {
  return (
    <>
      <NavigationDetails />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default DetailLayout;
