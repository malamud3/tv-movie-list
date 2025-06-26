import { UnifiedMediaItem } from '../../../interface/TmdbTypes';
import { CellRow } from '../CellRow';
import styles from './CellListVertical.module.css';
import { chunkArray } from '../../../util/array';
import { useMemo } from 'react';

interface CellListVerticalProps {
  movies: UnifiedMediaItem[];
  setLastItemRef?: (node: HTMLLIElement | null) => void;
  columns?: number;
}

export const CellListVertical = ({
  movies,
  setLastItemRef,
  columns = 8,
}: CellListVerticalProps) => {
  const rows = useMemo(
    () => chunkArray(movies, Math.max(1, columns)),
    [movies, columns]
  );

  if (!rows.length) {
    return <div className={styles.empty}>No items to display</div>;
  }

  return (
    <div className={styles.matrix} role="grid" aria-label="Movies grid">
      {rows.map((rowMovies, rowIndex) => {
        const isLastRow = rowIndex === rows.length - 1;

        return (
          <ul key={rowIndex} className={styles.row} role="row">
            <CellRow
              movies={rowMovies}
              rowIndex={rowIndex}
              isLastRow={isLastRow}
              setLastItemRef={isLastRow ? setLastItemRef : undefined}
            />
          </ul>
        );
      })}
    </div>
  );
};
