import classes from './ImgCell.module.css';

type MovieCardProps = {
  posterPath: string;
  title?: string;
  overview?: string;
  rating?: number; // Rating out of 10
  onClick?: () => void;
  showRating?: boolean; // New prop to control rating visibility
};

export const ImgCell = ({ posterPath, title, overview, rating, onClick, showRating = true }: MovieCardProps) => {
  const imageUrl = posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : '/placeholder-image.jpg'; // Fallback image for missing posterPath



  // Format rating to 1 decimal place and determine color
  const formatRating = (rating: number) => {
    return Math.round(rating * 10) / 10;
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return 'excellent'; // Green
    if (rating >= 6.5) return 'good'; // Yellow
    if (rating >= 5) return 'average'; // Orange
    return 'poor'; // Red
  };

  return (
    <div
      className={classes.card}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      onClick={onClick}
      role={onClick ? 'button' : undefined} // Accessibility improvement
      aria-label={title || 'Movie Poster'} // Accessibility improvement
      title={overview ? `${title}: ${overview}` : title} // Show overview as tooltip
    >
      <img
        src={imageUrl}
        alt={title || 'Movie Poster'}
        className={classes.image}
        width={160}
        height={240}
        loading="lazy"
      />
      
      {/* Rating Circle - Only show if enabled and rating exists */}
      {showRating && rating && rating > 0 && (
        <div className={`${classes.ratingCircle} ${classes[getRatingColor(rating)]}`}>
          <span className={classes.ratingText}>
            {formatRating(rating)}
          </span>
        </div>
      )}

      {overview && (
        <div className={classes.overlay}>
          <div className={classes.overlayContent}>
            <h4 className={classes.overlayTitle}>{title}</h4>
            <p className={classes.overlayOverview}>
              {overview.length > 150 ? `${overview.substring(0, 150)}...` : overview}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImgCell;
