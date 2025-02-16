import { useQuery } from '@tanstack/react-query';
import { API_TV } from '../services/Consts';

async function fetchMovies() {
  console.log(API_TV.Movies.getPopularMovies);
  const response = await fetch(API_TV.Movies.getPopularMovies);
  const data = await response.json();
  return data.results;
}

export default function HomePage() {
  const {
    data: movies,
    isLoading,
    error,
  } = useQuery<{ id: number; title: string }[]>({
    queryKey: ['movies'],
    queryFn: fetchMovies,
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
