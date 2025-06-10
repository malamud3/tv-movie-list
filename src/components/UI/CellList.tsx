import { Link } from 'react-router-dom';
import { Show } from '../../interface/TmdbTypes';
import { lazy, Suspense } from 'react';
import styles from './CellList.module.css';

const ImgCell = lazy(() => import('../ImgCell/ImgCell'));

type CellListProps = {
  movies: Show[];
  setLastItemRef?: (node: HTMLLIElement | null) => void;
};

export const CellList = ({ movies, setLastItemRef }: CellListProps) => {
  return (
    <ul className={styles.horizontal}>
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
