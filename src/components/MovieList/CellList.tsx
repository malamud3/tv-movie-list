import { Link } from 'react-router-dom';
import { Show } from '../../interface/TmdbTypes';
import { lazy, Suspense } from 'react';
import styles from './MovieList.module.css';

const ImgCell = lazy(() => import('../ImgCell/ImgCell'));

type CellListProps = {
  movies: Show[];
  setLastItemRef?: (node: HTMLLIElement | null) => void; // <-- add this prop
};

export const CellList = ({ movies, setLastItemRef }: CellListProps) => {
  return (
    <ul className={styles.list}>
      {movies.map((movie, index) => {
        const isLastItem = index === movies.length - 2;
        return (
          <li
            key={movie.id}
            className={styles.item}
            ref={isLastItem ? setLastItemRef : undefined} // attach ref only to  one before last item
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
