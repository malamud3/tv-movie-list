import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { API_tmdb } from '../services/API_Tmdb';
import { tmdbActions } from '../interface/Consts';
import { Show } from '../interface/TmdbTypes';
import { MovieList } from '../components/MovieList/MovieList';
import MovieDetailsModal from '../components/UI/Model/MovieDetailsModal';
import ErrorBlock from '../components/UI/ErrorBlock/ErrorBlock';
import { useInfiniteScroll } from '../util/hooks/useInfiniteScroll';

export default function HomePage() {
  const queryKey: [string, tmdbActions] = ['MOVIES', tmdbActions.getPopular];
  const { movieId } = useParams();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery<Show[], Error>({
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

  const selectedMovie = movies.find((movie) => movie.id === Number(movieId));

  const { lastItemRef } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

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
            <MovieList movies={movies} setLastItemRef={lastItemRef} />
          )}
          {isFetchingNextPage && <p>Loading more movies...</p>}
        </>
      )}
      {selectedMovie && <MovieDetailsModal movie={selectedMovie} />}
    </main>
  );
}
