import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useCallback, useRef, useEffect } from 'react';
import { API_tmdb } from '../services/API_Tmdb';
import { tmdbActions } from '../interface/Consts';
import { Show } from '../interface/TmdbTypes';
import { MovieList } from '../components/MovieList/MovieList';
import MovieDetailsModal from '../components/UI/Model/MovieDetailsModal';
import ErrorBlock from '../components/UI/ErrorBlock/ErrorBlock';

export default function HomePage() {
  const queryKey: [string, tmdbActions] = ['MOVIES', tmdbActions.getPopular];
  const { movieId } = useParams();
  const observerRef = useRef<IntersectionObserver | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery<Show[]>({
    queryKey,
    queryFn: ({ pageParam = 1, signal }) =>
      API_tmdb({
        signal,
        queryKey,
        dataPage: Number(pageParam),
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length > 0 ? allPages.length + 1 : undefined,
  });

  const movies: Show[] = data?.pages.flat() || [];
  const uniqueMovies = Array.from(
    new Map(movies.map((movie) => [movie.id, movie])).values()
  );
  const selectedMovie = movies.find((movie) => movie.id === Number(movieId));

  // Clean up previous observer on dependencies change
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasNextPage, isFetchingNextPage]);

  // Update the lastItemRef callback to be more robust
  const lastItemRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (isFetchingNextPage || !hasNextPage) return;

      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      if (node) {
        observerRef.current = new IntersectionObserver(
          (entries) => {
            if (
              entries[0].isIntersecting &&
              hasNextPage &&
              !isFetchingNextPage
            ) {
              fetchNextPage();
            }
          },
          { threshold: 0.1 } // Add a small threshold
        );

        observerRef.current.observe(node);
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );
  useEffect(() => {
    console.log('Current pages:', data?.pages.length);
    console.log('Has next page:', hasNextPage);
    console.log('Is fetching next:', isFetchingNextPage);
  }, [data, hasNextPage, isFetchingNextPage]);

  return (
    <main>
      <h2>Popular Movies</h2>
      {isLoading ? (
        <p>Loading movies...</p>
      ) : error ? (
        <ErrorBlock
          title="Failed to load movies"
          message={
            error instanceof Error ? error.message : 'Unknown error occurred'
          }
        />
      ) : (
        <>
          {movies.length > 0 && (
            <MovieList movies={uniqueMovies} setLastItemRef={lastItemRef} />
          )}
          {isFetchingNextPage && <p>Loading more movies...</p>}
          <p>Current loaded pages: {data?.pages.length || 0}</p>
        </>
      )}
      {selectedMovie && <MovieDetailsModal movie={selectedMovie} />}
    </main>
  );
}
