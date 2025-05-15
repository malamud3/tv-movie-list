import { Show } from '../../interface/TmdbTypes';
import { ImgCell } from '../ImgCell/ImgCell';
import styles from './MovieList.module.css';

type MovieListProps = {
  movies: Show[];
  onSelectMovie: (movie: Show) => void;
};

export const MovieList = ({ movies, onSelectMovie }: MovieListProps) => {
  return (
    <ul className={styles.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={styles.item}>
          <ImgCell
            posterPath={movie.poster_path}
            title={movie.title || movie.title}
            onClick={() => onSelectMovie(movie)}
          />
        </li>
      ))}
    </ul>
  );
};
