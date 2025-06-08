import { Link } from 'react-router-dom';
import { Show } from '../../interface/TmdbTypes';
import { lazy, Suspense } from 'react';
import styles from './CellList.module.css';

const ImgCell = lazy(() => import('../ImgCell/ImgCell'));

type CellListProps = {
  movies: Show[];
  col?: number; // Number of columns or rows
  setLastItemRef?: (node: HTMLLIElement | null) => void;
  axis?: 'X' | 'Y'; // Determines scrolling direction
};

export const CellList = ({
  movies,
  setLastItemRef,
  axis = 'X',
  col = 8, // Default to 3 columns/rows
}: CellListProps) => {
  return (
    <ul
      className={`${styles.list} ${
        axis === 'X' ? styles.horizontal : styles.vertical
      }`}
      style={{
        gridTemplateColumns: axis === 'X' ? `repeat(${col}, 1fr)` : undefined,
        gridTemplateRows: axis === 'Y' ? `repeat(${col}, auto)` : undefined,
      }}
    >
      {movies.map((movie, index) => {
        const isLastItem = index === movies.length - 1;
        return (
          <li
            key={`${movie.id}-${index}`}
            className={styles.item}
            ref={isLastItem ? setLastItemRef : undefined}
          >
            <Link to={`/${movie.id}`} state={{ item: movie }}>
              <Suspense fallback={<div className={styles.imgPlaceholder} />}>
                <ImgCell posterPath={movie.poster_path} title={movie.title} />
              </Suspense>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
