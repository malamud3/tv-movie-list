import { useQuery } from '@tanstack/react-query';
import { API_tmdb } from '../services/API_Tmdb';
import { tmdbActions } from '../interface/Consts';
import { Show } from '../interface/TmdbTypes';
import { ImgCell } from '../components/ImgCell/ImgCell';

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
    <>
      <main>
        <h2>Popular Movies</h2>
        {isLoading && <p>Loading movies...</p>}
        {error && <p>Error fetching movies.</p>}
        {movies ? (
          <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {movies.map((movie) => (
              <li key={movie.id}>
                <ImgCell posterPath={movie.poster_path} />
              </li>
            ))}
          </ul>
        ) : null}
      </main>
    </>
  );
}
