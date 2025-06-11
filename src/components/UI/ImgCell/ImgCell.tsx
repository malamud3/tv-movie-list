import classes from './ImgCell.module.css';

type MovieCardProps = {
  posterPath: string;
  title?: string;
  onClick?: () => void;
};

export const ImgCell = ({ posterPath, title, onClick }: MovieCardProps) => {
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
    >
      <img
        src={imageUrl}
        alt={title || 'Movie Poster'}
        className={classes.image}
        width={160}
        height={240}
        loading="lazy"
      />
    </div>
  );
};

export default ImgCell;
