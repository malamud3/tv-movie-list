import { Link } from 'react-router-dom';
import { Show } from '../../interface/TmdbTypes';
import { lazy, Suspense } from 'react';
import styles from './CellList.module.css';

const ImgCell = lazy(() => import('../ImgCell/ImgCell'));

type CellListProps = {
  movies: Show[];
  rows?: number; // Optional prop with default value
  setLastItemRef?: (node: HTMLLIElement | null) => void;
};

export const CellList = ({
  movies,
  rows = 1,
  setLastItemRef,
}: CellListProps) => {
  const itemsPerRow = Math.ceil(movies.length / rows);

  return (
    <ul className={styles.list}>
      {movies.map((movie, index) => {
        const isLastItem = index === movies.length - 2;
        return (
          <li
            key={movie.id}
            className={styles.item}
            style={{ flexBasis: `${100 / itemsPerRow}%` }} // Adjust width per row
            ref={isLastItem ? setLastItemRef : undefined}
          >
            <Link to={`/movies/${movie.id}`}>
              <Suspense fallback={<div>Loading...</div>}>
                <ImgCell posterPath={movie.poster_path} title={movie.title} />
              </Suspense>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
