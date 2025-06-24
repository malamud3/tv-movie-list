import { Show } from '../../../interface/TmdbTypes';
import { CellRow } from '../CellRow';
import styles from './CellListHorizontal.module.css';

type CellListHorizontalProps = {
  movies: Show[];
  setLastItemRef?: (node: HTMLLIElement | null) => void;
};

export const CellListHorizontal = ({
  movies,
  setLastItemRef,
}: CellListHorizontalProps) => (
  <ul className={styles.horizontal}>
    <CellRow movies={movies} setLastItemRef={setLastItemRef} isLastRow />
  </ul>
);
