import { useParams } from 'react-router-dom';
import ListController from '../components/MovieList/ListController';
import { tmdbActions } from '../interface/Consts';

export default function MoviePage() {
  const { showId } = useParams();

  const selectedId = Number.isInteger(Number(showId))
    ? Number(showId)
    : undefined;

  // Debug: Check if we can see rating data in console
  console.log('MoviePage: showId =', showId, 'selectedId =', selectedId);

  return (
    <div>
      <ListController
        key="recently-added-movies"
        type="MOVIES"
        title="Recently Added Movies"
        fetchFunction={tmdbActions.getRecentlyAdded}
        selectedId={selectedId}
      />
    </div>
  );
}
