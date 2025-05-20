import { Outlet } from 'react-router-dom';
import MovieDetailsModal from '../components/NavigationDetails/MovieDetailsModal'; // Adjust the path as needed

function DetailLayout() {
  return (
    <>
      <MovieDetailsModal />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default DetailLayout;
