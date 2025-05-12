// DetailLayout.tsx
import { Outlet } from 'react-router-dom';
import MovieDetailsPage from '../../pages/MovieDetailsPage';

function DetailLayout() {
  return (
    <>
      <MovieDetailsPage />
      <main className="detail-content">
        <Outlet />
      </main>
    </>
  );
}

export default DetailLayout;
