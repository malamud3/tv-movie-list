import { useQuery } from '@tanstack/react-query';
import { API_tmdb } from '../services/API_Tmdb';
import { tmdbActions } from '../interface/Consts';

const fetchPopularMovies = async ({ signal }: { signal: AbortSignal }) => {
  return API_tmdb({
    queryKey: ['MOVIES', tmdbActions.getPopular],
    dataPage: 1,
    signal,
  });
};

export default function HomePage() {
  const {
    data: movies,
    isLoading,
    error,
  } = useQuery<{ id: number; title: string }[]>({
    queryKey: ['MOVIES', tmdbActions.getPopular],
    queryFn: fetchPopularMovies,
  });

  return (
    <>
      <main>
        <h2>Popular Movies</h2>
        {isLoading && <p>Loading movies...</p>}
        {error && <p>Error fetching movies.</p>}
        {movies && (
          <ul>
            {movies.map((movie: { id: number; title: string }) => (
              <li key={movie.id}>{movie.title}</li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
