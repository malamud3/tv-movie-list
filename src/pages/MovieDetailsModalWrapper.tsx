import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import MovieDetailsModal from '../components/UI/Model/MovieDetailsModal';
import { Show } from '../interface/TmdbTypes';

export default function MovieDetailsModalWrapper() {
  const { itemId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const stateItem = location.state?.item;

  const cachedItems =
    queryClient.getQueryData<Show[]>(['MOVIES']) ||
    queryClient.getQueryData<Show[]>(['SHOWS']);

  const cachedItem =
    cachedItems?.find((i) => String(i.id) === itemId) ?? undefined;

  const movie = stateItem || cachedItem;

  if (!movie) {
    navigate(-1);
    return null;
  }

  return <MovieDetailsModal movie={movie} />;
}
