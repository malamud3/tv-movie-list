import { useQuery } from '@tanstack/react-query';
import { API_tmdb } from '../services/API_Tmdb';
import { tmdbTypes } from '../interface/Consts';

export default function HomePage() {
  const {
    data: movies,
    isLoading,
    error,
  } = useQuery<{ id: number; title: string }[]>({
    queryKey: ['movies'],
    queryFn: async () => {
      const api = await API_tmdb({ type: tmdbTypes.MOVIES, dataPage: 1 });
      return api.getPopular();
    },
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
