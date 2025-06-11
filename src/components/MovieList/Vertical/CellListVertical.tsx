import { Show } from '../../../interface/TmdbTypes';
import { CellRow } from '../CellRow';
import styles from './CellListVertical.module.css';

type CellListVerticalProps = {
  movies: Show[];
  setLastItemRef?: (node: HTMLLIElement | null) => void;
  columns?: number; // Optional: allow custom column count
};

// Helper to chunk array into rows
function chunkArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

export const CellListVertical = ({
  movies,
  setLastItemRef,
  columns = 8,
}: CellListVerticalProps) => {
  const rows = chunkArray(movies, columns);

  return (
    <div className={styles.matrix}>
      {rows.map((rowMovies, rowIdx) => (
        <ul key={rowIdx} className={styles.row}>
          <CellRow
            movies={rowMovies}
            rowIndex={rowIdx}
            isLastRow={rowIdx === rows.length - 1}
            setLastItemRef={
              rowIdx === rows.length - 1 ? setLastItemRef : undefined
            }
          />
        </ul>
      ))}
    </div>
  );
};
