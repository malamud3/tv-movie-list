// ImgCell.tsx
import classes from './ImgCell.module.css';

type MovieCardProps = {
  posterPath: string;
  title?: string;
  onClick?: () => void;
};

export const ImgCell = ({ posterPath, title, onClick }: MovieCardProps) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;

  return (
    <div
      className={classes.card}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <img
        src={imageUrl}
        alt={title || 'Movie Poster'}
        className={classes.image}
      />
    </div>
  );
};

export default ImgCell;
