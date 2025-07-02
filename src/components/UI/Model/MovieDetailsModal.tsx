import { useState } from 'react';
import { UnifiedMediaItem } from '../../../interface/TmdbTypes.ts';
import Modal from './Modal.tsx';
import { useNavigate } from 'react-router-dom';
import { useTrailer } from '../../../util/hooks/useTrailer.ts';
import { useFavorites } from '../../../util/hooks/useFavorites.ts';
import YouTubePlayer from '../../Youtube/YouTubePlayer.tsx';
import { ImgCell } from '../ImgCell/ImgCell.tsx';
import Star from '../Star/Star.tsx';
import styles from './MovieDetailsModal.module.css';
import { getMediaTitle, getMediaReleaseDate, formatReleaseDate } from '../../../util/dateHelpers.ts';

type MovieDetailsModalProps = {
  movie: UnifiedMediaItem;
};

const MovieDetailsModal = ({ movie }: MovieDetailsModalProps) => {
  const navigate = useNavigate();
  const [shouldLoadTrailer, setShouldLoadTrailer] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  
  // Debug: Log the movie data to see what we're receiving
  console.log('MovieDetailsModal - movie data:', {
    id: movie.id,
    title: getMediaTitle(movie),
    overview: movie.overview,
    overviewLength: movie.overview?.length || 0,
    vote_average: movie.vote_average,
    poster_path: movie.poster_path
  });
  
  const title = getMediaTitle(movie);
  const releaseDate = getMediaReleaseDate(movie);
  const formattedReleaseDate = formatReleaseDate(releaseDate);

  const handleToggleFavorite = () => {
    toggleFavorite({
      id: movie.id,
      title,
      poster_path: movie.poster_path,
      overview: movie.overview,
      vote_average: movie.vote_average,
      media_type: movie.media_type
    });
  };

  // ...existing code...

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
        <div className={styles.posterContainer}>
          <ImgCell
            posterPath={movie.poster_path}
            title={title}
            overview={movie.overview}
            rating={movie.vote_average}
            showRating={false}
          />
        </div>
        <div className={styles.details}>
          <div className={styles.titleSection}>
            <h2 className={styles.title}>{title}</h2>
            <Star
              isFavorite={isFavorite(movie.id)}
              onToggleFavorite={handleToggleFavorite}
              size="medium"
            />
          </div>
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
