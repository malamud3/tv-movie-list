import { UnifiedMediaItem } from '../../interface/TmdbTypes';
import { usePaginatedContent } from '../../util/hooks/usePaginatedContent';
import { useInfiniteScroll } from '../../util/hooks/useInfiniteScroll';
import ErrorBlock from '../UI/ErrorBlock/ErrorBlock';
import { CellListHorizontal } from './Horizontal/CellListHorizontal';
import { CellListVertical } from './Vertical/CellListVertical';
import MovieDetailsModal from '../UI/Model/MovieDetailsModal';
import { tmdbActions } from '../../interface/Consts';
import { useMemo } from 'react';
import { flattenAndFilterShows } from '../../util/array';

interface ListControllerProps {
  type: string;
  title: string;
  fetchFunction: tmdbActions;
  selectedId?: number;
  listType?: 'vertical' | 'horizontal';
  query?: string;
  enabled?: boolean;
}

export default function ListController({
  type,
  title,
  fetchFunction,
  selectedId,
  listType = 'vertical',
  query,
  enabled = true,
}: ListControllerProps) {
  const {
    data: pages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = usePaginatedContent([type, fetchFunction], { query, enabled });

  const items: UnifiedMediaItem[] = useMemo(() => flattenAndFilterShows(pages), [pages]);

  const { lastItemRef } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const selectedItem = useMemo(
    () => items.find((item) => item.id === selectedId),
    [items, selectedId]
  );

  // Debug: Log selected item data
  if (selectedItem) {
    console.log('ListController - selectedItem found:', {
      id: selectedItem.id,
      title: selectedItem.title || selectedItem.name,
      overview: selectedItem.overview,
      overviewExists: !!selectedItem.overview,
      overviewLength: selectedItem.overview?.length || 0,
    });
  } else if (selectedId) {
    console.log('ListController - selectedId but no item found:', selectedId, 'Available items:', items.length);
  }

  return (
    <section>
      <h2>{title}</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <ErrorBlock
          title={`Failed to load ${title.toLowerCase()}`}
          message={error instanceof Error ? error.message : 'Unknown error'}
        />
      ) : (
        <>
          {items.length > 0 ? (
            listType === 'horizontal' ? (
              <div
                style={{
                  padding: 10,
                }}
              >
                <CellListHorizontal
                  movies={items}
                  setLastItemRef={lastItemRef}
                />
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginInline: 20,
                }}
              >
                <CellListVertical movies={items} setLastItemRef={lastItemRef} />
              </div>
            )
          ) : (
            <p>No items available</p>
          )}
          {isFetchingNextPage && <p>Loading more...</p>}
        </>
      )}
      {selectedItem && <MovieDetailsModal movie={selectedItem} />}
    </section>
  );
}
