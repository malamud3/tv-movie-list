import { Show } from '../../../interface/TmdbTypes.ts';
import Modal from './Modal.tsx';
import { useNavigate } from 'react-router-dom';
import styles from './NavigationDetails.module.css';

type MovieDetailsModalProps = {
  movie: Show;
};

const MovieDetailsModal = ({ movie }: MovieDetailsModalProps) => {
  const navigate = useNavigate();

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/fallback-poster.png';

  return (
    <Modal onClose={() => navigate(-1)}>
      <h2 className={styles.title}>{movie.title ?? 'Untitled Movie'}</h2>
      <div className={styles.container}>
        <img
          src={imageUrl}
          alt={movie.title ? `${movie.title} Poster` : 'Movie Poster'}
          className={styles.poster}
          loading="lazy"
          draggable={false}
        />
        <div className={styles.details}>
          <p>
            <strong>Rating:</strong>{' '}
            {movie.vote_average !== undefined
              ? `${movie.vote_average}/10`
              : 'N/A'}{' '}
            ({movie.vote_count ?? 0} votes)
          </p>
          <p>
            <strong>Release Date:</strong> {movie.release_date ?? 'Unknown'}
          </p>
          <p>
            <strong>Overview:</strong>{' '}
            {movie.overview ?? 'No overview available.'}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default MovieDetailsModal;
