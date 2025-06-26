import { UnifiedMediaItem } from '../../../interface/TmdbTypes';
import { CellRow } from '../CellRow';
import styles from './CellListHorizontal.module.css';

type CellListHorizontalProps = {
  movies: UnifiedMediaItem[];
  setLastItemRef?: (node: HTMLLIElement | null) => void;
};

export const CellListHorizontal = ({
  movies,
  setLastItemRef,
}: CellListHorizontalProps) => (
  <ul className={styles.horizontal} role="list">
    <CellRow movies={movies} setLastItemRef={setLastItemRef} isLastRow />
  </ul>
);
