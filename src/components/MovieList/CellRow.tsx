// components/CellRow/CellRow.tsx
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { UnifiedMediaItem } from '../../interface/TmdbTypes';
import { ImgCell } from '../UI/ImgCell/ImgCell';
import { getMediaTitle } from '../../util/dateHelpers';
import { useFavorites } from '../../util/hooks/useFavorites';

interface CellRowProps {
  movies: UnifiedMediaItem[];
  setLastItemRef?: (node: HTMLLIElement | null) => void;
  rowIndex?: number;
  isLastRow?: boolean;
}

export const CellRow = memo<CellRowProps>(
  ({ movies, setLastItemRef, rowIndex = 0, isLastRow = false }) => {
    const { isFavorite, toggleFavorite } = useFavorites();
    
    if (!movies?.length) return null;

    return (
      <>
        {movies.map((movie, colIndex) => {
          const isLastItem = isLastRow && colIndex === movies.length - 1;
          const itemKey = `${movie.id}-${rowIndex}-${colIndex}`;          const title = getMediaTitle(movie);

          const handleToggleFavorite = () => {
            toggleFavorite({
              id: movie.id,
              title,
              poster_path: movie.poster_path,
              overview: movie.overview,
              vote_average: movie.vote_average,
              media_type: movie.media_type
            });
          };

          // Debug: Log rating data
          console.log('CellRow movie:', movie.id, 'title:', title, 'rating:', movie.vote_average);

          return (
            <li key={itemKey} ref={isLastItem ? setLastItemRef : undefined}>
              <Link
                to={`/${movie.id}`}
                state={{ item: movie }}
                aria-label={`View details for ${title}`}
              >
                <ImgCell 
                  posterPath={movie.poster_path} 
                  title={title}
                  overview={movie.overview}
                  rating={movie.vote_average}
                  isFavorite={isFavorite(movie.id)}
                  onToggleFavorite={handleToggleFavorite}
                />
              </Link>
            </li>
          );
        })}
      </>
    );
  }
);

CellRow.displayName = 'CellRow';
