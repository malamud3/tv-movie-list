// src/components/MovieList/MovieList.tsx
import { Show } from '../../interface/TmdbTypes';
import { ImgCell } from '../ImgCell/ImgCell';
import styles from './MovieList.module.css';

type MovieListProps = {
  movies: Show[];
};

export const MovieList = ({ movies }: MovieListProps) => {
  return (
    <ul className={styles.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={styles.item}>
          <ImgCell posterPath={movie.poster_path} title={movie.title} />
        </li>
      ))}
    </ul>
  );
};
