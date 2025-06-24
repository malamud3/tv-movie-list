import { useMemo } from 'react';
import { Show } from '../../interface/TmdbTypes';
import { usePaginatedContent } from '../../util/hooks/usePaginatedContent';
import { useInfiniteScroll } from '../../util/hooks/useInfiniteScroll';
import { flattenAndFilterShows } from '../../util/array';
import { tmdbActions } from '../../interface/Consts';
import ErrorBlock from '../UI/ErrorBlock/ErrorBlock';
import { CellListHorizontal } from './Horizontal/CellListHorizontal';
import { CellListVertical } from './Vertical/CellListVertical';
import MovieDetailsModal from '../UI/Model/MovieDetailsModal';

type ListType = 'vertical' | 'horizontal';

interface ListControllerProps {
  type: string;
  title: string;
  fetchFunction: tmdbActions;
  selectedId?: number;
  listType?: ListType;
  columns?: number;
}

const LoadingSpinner = () => (
  <div className="loading-container" role="status" aria-label="Loading">
    <p>Loading...</p>
  </div>
);

const LoadingMore = () => (
  <div className="loading-more" role="status" aria-label="Loading more items">
    <p>Loading more...</p>
  </div>
);

const EmptyState = ({ message }: { message: string }) => (
  <div className="empty-state">
    <p>{message}</p>
  </div>
);

export default function ListController({
  type,
  title,
  fetchFunction,
  selectedId,
  listType = 'vertical',
  columns,
}: ListControllerProps) {
  const {
    data: pages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = usePaginatedContent([type, fetchFunction]);

  const items: Show[] = useMemo(
    () => flattenAndFilterShows(pages) ?? [],
    [pages]
  );

  const { lastItemRef } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const selectedItem = useMemo(
    () => (selectedId ? items.find((item) => item.id === selectedId) : null),
    [items, selectedId]
  );

  // Error state
  if (error) {
    return (
      <section>
        <h2>{title}</h2>
        <ErrorBlock
          title={`Failed to load ${title.toLowerCase()}`}
          message={error instanceof Error ? error.message : 'Unknown error'}
        />
      </section>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <section>
        <h2>{title}</h2>
        <LoadingSpinner />
      </section>
    );
  }

  // Empty state
  if (!items.length) {
    return (
      <section>
        <h2>{title}</h2>
        <EmptyState message="No items available" />
      </section>
    );
  }

  // Content rendering
  const renderList = () => {
    const commonProps = {
      movies: items,
      setLastItemRef: lastItemRef,
    };

    if (listType === 'horizontal') {
      return (
        <div style={{ padding: 10 }}>
          <CellListHorizontal {...commonProps} />
        </div>
      );
    }

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginInline: 20,
        }}
      >
        <CellListVertical {...commonProps} columns={columns} />
      </div>
    );
  };

  return (
    <section>
      <h2>{title}</h2>
      {renderList()}
      {isFetchingNextPage && <LoadingMore />}
      {selectedItem && <MovieDetailsModal movie={selectedItem} />}
    </section>
  );
}
