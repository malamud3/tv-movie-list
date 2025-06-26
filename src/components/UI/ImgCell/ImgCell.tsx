import classes from './ImgCell.module.css';

type MovieCardProps = {
  posterPath: string;
  title?: string;
  overview?: string;
  onClick?: () => void;
};

export const ImgCell = ({ posterPath, title, overview, onClick }: MovieCardProps) => {
  const imageUrl = posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : '/placeholder-image.jpg'; // Fallback image for missing posterPath

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
