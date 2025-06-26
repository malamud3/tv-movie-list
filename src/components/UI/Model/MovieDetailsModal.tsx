import { useState } from 'react';
import { UnifiedMediaItem } from '../../../interface/TmdbTypes.ts';
import Modal from './Modal.tsx';
import { useNavigate } from 'react-router-dom';
import { useTrailer } from '../../../util/hooks/useTrailer.ts';
import YouTubePlayer from '../../Youtube/YouTubePlayer.tsx';
import styles from './MovieDetailsModal.module.css';
import { getMediaTitle, getMediaReleaseDate, formatReleaseDate } from '../../../util/dateHelpers.ts';

type MovieDetailsModalProps = {
  movie: UnifiedMediaItem;
};

const MovieDetailsModal = ({ movie }: MovieDetailsModalProps) => {
  const navigate = useNavigate();
  const [shouldLoadTrailer, setShouldLoadTrailer] = useState(false);
  
  const title = getMediaTitle(movie);
  const releaseDate = getMediaReleaseDate(movie);
  const formattedReleaseDate = formatReleaseDate(releaseDate);

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/fallback-poster.png';

  // TanStack Query for trailer fetching - only enabled when shouldLoadTrailer is true
  const {
    data: trailerUrl,
    isLoading: trailerLoading,
    error: trailerError,
    isError,
  } = useTrailer(movie.id, title, {
    enabled: shouldLoadTrailer,
  });

  const handleLoadTrailer = () => {
    setShouldLoadTrailer(true);
  };

  const getErrorMessage = () => {
    if (trailerError instanceof Error) {
      return trailerError.message;
    }
    return 'Trailer not available';
  };

  return (
    <Modal onClose={() => navigate(-1)}>
      <div className={styles.container}>
        <img
          src={imageUrl}
          alt={`${title} Poster`}
          className={styles.poster}
          loading="lazy"
          draggable={false}
        />
        <div className={styles.details}>
          <h2 className={styles.title}>{title}</h2>
          <p>
            <strong>Rating:</strong>{' '}
            {movie.vote_average !== undefined
              ? `${movie.vote_average}/10`
              : 'N/A'}{' '}
            ({movie.vote_count ?? 0} votes)
          </p>
          <p>
            <strong>Release Date:</strong> {formattedReleaseDate}
          </p>
          <p>
            <strong>Overview:</strong>{' '}
            {movie.overview ?? 'No overview available.'}
          </p>

          {/* Trailer Section */}
          <div className={styles.trailerSection}>
            <YouTubePlayer
              url={trailerUrl}
              isLoading={trailerLoading}
              error={isError ? getErrorMessage() : null}
              onLoadTrailer={handleLoadTrailer}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MovieDetailsModal;
