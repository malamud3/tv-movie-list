import classes from './ImgCell.module.css';

type MovieCardProps = {
  posterPath: string;
  title?: string;
};

export const ImgCell = ({ posterPath }: MovieCardProps) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;

  return (
    <div className={classes.card}>
      <img src={imageUrl} alt={'title'} className={classes.image} />
    </div>
  );
};

export default ImgCell;
