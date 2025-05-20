import { useParams } from 'react-router-dom';
import { tmdbActions } from '../interface/Consts';
import { Show } from '../interface/TmdbTypes';
import { MovieList } from '../components/MovieList/MovieList';
import MovieDetailsModal from '../components/UI/Model/MovieDetailsModal';
import ErrorBlock from '../components/UI/ErrorBlock/ErrorBlock';
import { useInfiniteScroll } from '../util/hooks/useInfiniteScroll';
import { usePaginatedContent } from '../util/hooks/usePaginatedContent';

export default function HomePage() {
  const { movieId } = useParams();

  // Fetch popular movies
  const {
    data: moviePages,
    fetchNextPage: fetchNextMovies,
    hasNextPage: hasMoreMovies,
    isFetchingNextPage: isFetchingMovies,
    isLoading: isLoadingMovies,
    error: movieError,
  } = usePaginatedContent(['MOVIES', tmdbActions.getPopular]);

  // Fetch popular TV shows (if needed)
  const {
    data: tvShowPages,
    fetchNextPage: fetchNextTVShows,
    hasNextPage: hasMoreTVShows,
    isFetchingNextPage: isFetchingTVShows,
    isLoading: isLoadingTVShows,
    error: tvShowError,
  } = usePaginatedContent(['TV_SHOWS', tmdbActions.getPopular]);

  const movies: Show[] = moviePages?.pages.flat() || [];
  const selectedMovie = movies.find((movie) => movie.id === Number(movieId));

  const { lastItemRef } = useInfiniteScroll({
    hasNextPage: hasMoreMovies,
    isFetchingNextPage: isFetchingMovies,
    fetchNextPage: fetchNextMovies,
  });

  return (
    <main>
      <h2>Popular Movies</h2>
      {isLoadingMovies ? (
        <p>Loading movies...</p>
      ) : movieError ? (
        <ErrorBlock
          title="Failed to load movies"
          message={
            movieError instanceof Error
              ? movieError.message
              : 'Unknown error occurred'
          }
        />
      ) : (
        <>
          {movies.length > 0 && (
            <MovieList movies={movies} setLastItemRef={lastItemRef} />
          )}
          {isFetchingMovies && <p>Loading more movies...</p>}
        </>
      )}
      {selectedMovie && <MovieDetailsModal movie={selectedMovie} />}
    </main>
  );
}
