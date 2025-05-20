import { useParams } from 'react-router-dom';
import { ListConfing } from '../components/MovieList/ListConfing';
import ListController from '../components/MovieList/ListController';

export default function HomePage() {
  const { movieId } = useParams();
  const selectedId = movieId ? Number(movieId) : undefined;

  return (
    <main>
      {ListConfing.map((section) => (
        <ListController
          key={section.id}
          id={section.id}
          title={section.title}
          fetchFunction={section.fetchFunction}
          selectedId={selectedId}
        />
      ))}
    </main>
  );
}
