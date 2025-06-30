import { useParams } from 'react-router-dom';
import ListController from '../components/MovieList/ListController';
import { tmdbActions } from '../interface/Consts';

export default function ShowPage() {
  const { showId } = useParams();

  const selectedId = Number.isInteger(Number(showId))
    ? Number(showId)
    : undefined;

  return (
    <div>
      <ListController
        key="recently-added-shows"
        type="TV_SHOWS"
        title="Recently Added TV Shows"
        fetchFunction={tmdbActions.getRecentlyAdded}
        selectedId={selectedId}
      />
    </div>
  );
}
