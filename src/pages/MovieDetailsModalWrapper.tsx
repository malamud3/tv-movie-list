import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import MovieDetailsModal from '../components/UI/Model/MovieDetailsModal';
import { UnifiedMediaItem } from '../interface/TmdbTypes';

export default function MovieDetailsModalWrapper() {
  const { itemId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const stateItem = location.state?.item;

  // Try to find the item in various query caches
  const queryCache = queryClient.getQueryCache();
  const allQueries = queryCache.getAll();

  let cachedItem: UnifiedMediaItem | undefined;

  // Search through all cached queries to find the item
  for (const query of allQueries) {
    const data = query.state.data as
      | { pages: UnifiedMediaItem[][] }
      | undefined;
    if (data?.pages) {
      // Handle infinite query structure
      const flatData = data.pages.flat();
      const found = flatData.find(
        (item: UnifiedMediaItem) => String(item?.id) === itemId
      );
      if (found) {
        cachedItem = found;
        break;
      }
    }
  }

  const movie = stateItem || cachedItem;

  if (!movie) {
    navigate(-1);
    return null;
  }

  return <MovieDetailsModal movie={movie} />;
}
