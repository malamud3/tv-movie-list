import ImgCell from '../ImgCell/ImgCell';
import classes from './ImgCellRow.module.css';
import { Show } from '../../interface/TmdbTypes';

type ImgCellRowProps = {
  movies: Show;
};

export const ImgCellRow = ({ movies }: ImgCellRowProps) => {
  return (
    <div className={classes.row}>
      {movies.map((movie, index) => (
        <ImgCell
          key={index}
          posterPath={movie.posterPath}
          title={movie.title}
        />
      ))}
    </div>
  );
};

export default ImgCellRow;
