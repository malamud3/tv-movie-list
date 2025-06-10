import { useParams } from 'react-router-dom';
import { ListConfing } from '../components/MovieList/ListConfing';
import ListController from '../components/MovieList/ListController';

export default function HomePage() {
  const { movieId } = useParams();

  const selectedId = Number.isInteger(Number(movieId))
    ? Number(movieId)
    : undefined;

  if (!ListConfing?.length) {
    return (
      <main>
        <p>No sections available</p>
      </main>
    );
  }

  return (
    <main style={{ padding: 7 }}>
      {ListConfing.map((section) => (
        <ListController
          key={section.id}
          type={section.type}
          title={section.title}
          fetchFunction={section.fetchFunction}
          selectedId={selectedId}
          listType="horizontal"
        />
      ))}
    </main>
  );
}
