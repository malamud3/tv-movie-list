import { useParams } from 'react-router-dom';
import ListController from '../components/MovieList/ListController';
import { tmdbActions } from '../interface/Consts';

export default function ShowPage() {
  const { showId } = useParams();

  const selectedId = Number.isInteger(Number(showId))
    ? Number(showId)
    : undefined;

  return (
    <main style={{ padding: 7 }}>
      <ListController
        key="recently-added-shows"
        type="TV_SHOWS"
        title="Recently Added TV Shows"
        fetchFunction={tmdbActions.getRecentlyAdded}
        selectedId={selectedId}
      />
    </main>
  );
}
