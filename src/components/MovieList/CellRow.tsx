// components/CellRow/CellRow.tsx
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Show } from '../../interface/TmdbTypes';
import { ImgCell } from '../UI/ImgCell/ImgCell';

interface CellRowProps {
  movies: Show[];
  setLastItemRef?: (node: HTMLLIElement | null) => void;
  rowIndex?: number;
  isLastRow?: boolean;
}

export const CellRow = memo<CellRowProps>(
  ({ movies, setLastItemRef, rowIndex = 0, isLastRow = false }) => (
    <>
      {movies.map((movie, colIndex) => {
        const isLastItem = isLastRow && colIndex === movies.length - 1;

        return (
          <li
            key={`${movie.id}-${rowIndex}-${colIndex}`}
            ref={isLastItem ? setLastItemRef : undefined}
          >
            <Link
              to={`/${movie.id}`}
              state={{ item: movie }}
              aria-label={`View details for ${movie.title}`}
            >
              <ImgCell posterPath={movie.poster_path} title={movie.title} />
            </Link>
          </li>
        );
      })}
    </>
  )
);
