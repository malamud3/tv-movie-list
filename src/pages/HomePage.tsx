// HomePage.tsx
import { useQuery } from '@tanstack/react-query';
import { API_tmdb } from '../services/API_Tmdb';
import { tmdbActions } from '../interface/Consts';
import { Show } from '../interface/TmdbTypes';
import { MovieList } from '../components/MovieList/MovieList';
import ErrorBlock from '../components/UI/ErrorBlock/ErrorBlock';

export default function HomePage() {
  const queryKey: [string, tmdbActions] = ['MOVIES', tmdbActions.getPopular];

  const {
    data: movies,
    isLoading,
    error,
  } = useQuery<Show[]>({
    queryKey,
    queryFn: ({ signal }) =>
      API_tmdb({
        signal,
        queryKey,
        dataPage: 1,
      }),
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
        movies && (
          <>
            <MovieList movies={movies} />
          </>
        )
      )}
    </main>
  );
}
