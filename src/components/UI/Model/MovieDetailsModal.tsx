import { Show } from '../../../interface/TmdbTypes.ts';
import Modal from './Modal.tsx';
import { useNavigate } from 'react-router-dom';
import { useTrailer } from '../../../util/hooks/useTrailer.ts';
import YouTubePlayer from '../../Youtube/YouTubePlayer.tsx';
import styles from './MovieDetailsModal.module.css';

type MovieDetailsModalProps = {
  movie: Show;
};

const MovieDetailsModal = ({ movie }: MovieDetailsModalProps) => {
  const navigate = useNavigate();

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/fallback-poster.png';

  // TanStack Query for trailer fetching
  const {
    data: trailerUrl,
    isLoading: trailerLoading,
    error: trailerError,
    isError,
  } = useTrailer(movie.id, movie.title || '');

  return (
    <Modal onClose={() => navigate(-1)}>
      <div className={styles.container}>
        <img
          src={imageUrl}
          alt={movie.title ? `${movie.title} Poster` : 'Movie Poster'}
          className={styles.poster}
          loading="lazy"
          draggable={false}
        />
        <div className={styles.details}>
          <h2 className={styles.title}>{movie.title ?? 'Untitled Movie'}</h2>
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

          {/* Trailer Section */}
          <div className={styles.trailerSection}>
            <h3 className={styles.trailerTitle}>Trailer</h3>
            {trailerLoading && (
              <div className={styles.trailerPlaceholder}>
                <div className={styles.spinner}></div>
                <p>Loading trailer...</p>
              </div>
            )}
            {isError && (
              <div className={styles.trailerPlaceholder}>
                <p className={styles.trailerError}>
                  {trailerError instanceof Error
                    ? trailerError.message
                    : 'Trailer not available'}
                </p>
              </div>
            )}
            {trailerUrl && !trailerLoading && !isError && (
              <div className={styles.trailerContainer}>
                <YouTubePlayer url={trailerUrl} />
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MovieDetailsModal;
