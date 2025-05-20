import { useParams } from 'react-router-dom';
import { ListConfing } from '../components/MovieList/ListConfing';
import ListController from '../components/MovieList/ListController';

export default function HomePage() {
  const { movieId } = useParams();
  const selectedId =
    movieId && !isNaN(Number(movieId)) ? Number(movieId) : undefined;

  return (
    <main>
      {ListConfing?.length > 0 ? (
        ListConfing.map((section) => (
          <ListController
            key={section.id}
            type={section.type} // Pass the 'type' property
            title={section.title}
            fetchFunction={section.fetchFunction}
            selectedId={selectedId}
          />
        ))
      ) : (
        <p>No sections available</p>
      )}
    </main>
  );
}
