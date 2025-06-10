import { Link } from 'react-router-dom';
import { Show } from '../../interface/TmdbTypes';
import { lazy } from 'react';

const ImgCell = lazy(() => import('../ImgCell/ImgCell'));

type CellRowProps = {
  movies: Show[];
  setLastItemRef?: (node: HTMLLIElement | null) => void;
  rowIndex?: number;
  isLastRow?: boolean;
};

export const CellRow = ({
  movies,
  setLastItemRef,
  rowIndex = 0,
  isLastRow = true,
}: CellRowProps) => (
  <>
    {movies.map((movie, colIndex) => {
      const isLastItem = isLastRow && colIndex === movies.length - 1;
      return (
        <li
          key={`${movie.id}-${rowIndex}-${colIndex}`}
          ref={isLastItem ? setLastItemRef : undefined}
        >
          <Link to={`/${movie.id}`} state={{ item: movie }}>
            <ImgCell posterPath={movie.poster_path} title={movie.title} />
          </Link>
        </li>
      );
    })}
  </>
);
