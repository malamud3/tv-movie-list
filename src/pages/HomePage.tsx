import { useQuery } from '@tanstack/react-query';
import { API_tmdb } from '../services/API_Tmdb';
import { tmdbActions } from '../interface/Consts';
import { Show } from '../interface/TmdbTypes';
import { MovieList } from '../components/MovieList/MovieList';

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
        <p>
          Error fetching movies:{' '}
          {error instanceof Error ? error.message : 'Unknown error'}
        </p>
      ) : (
        movies && <MovieList movies={movies} />
      )}
    </main>
  );
}
