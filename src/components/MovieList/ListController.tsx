import { Show } from '../../interface/TmdbTypes';
import { usePaginatedContent } from '../../util/hooks/usePaginatedContent';
import { useInfiniteScroll } from '../../util/hooks/useInfiniteScroll';
import ErrorBlock from '../UI/ErrorBlock/ErrorBlock';
import { CellList } from '../MovieList/CellList';
import MovieDetailsModal from '../UI/Model/MovieDetailsModal';
import { tmdbActions } from '../../interface/Consts';

interface ListControllerProps {
  id: number;
  type: string;
  title: string;
  fetchFunction: tmdbActions;
  selectedId?: number;
}

export default function ListController({
  type,
  title,
  fetchFunction,
  selectedId,
}: ListControllerProps) {
  const {
    data: pages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = usePaginatedContent([type, fetchFunction]);

  const items: Show[] = pages?.pages.flat() || [];

  const { lastItemRef } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const selectedItem = items.find((item) => item.id === selectedId);

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
            <CellList movies={items} setLastItemRef={lastItemRef} />
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
