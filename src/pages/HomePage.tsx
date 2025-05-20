import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { API_tmdb } from '../services/API_Tmdb';
import { tmdbActions } from '../interface/Consts';
import { Show } from '../interface/TmdbTypes';
import { MovieList } from '../components/MovieList/MovieList';
import MovieDetailsModal from '../components/UI/Model/MovieDetailsModal';
import ErrorBlock from '../components/UI/ErrorBlock/ErrorBlock';

export default function HomePage() {
  const queryKey: [string, tmdbActions] = ['MOVIES', tmdbActions.getPopular];
  const { movieId } = useParams(); // Get the movie ID from the URL

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

  const selectedMovie = movies?.find((movie) => movie.id === Number(movieId)); // Find the selected movie

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
        movies && <MovieList movies={movies} />
      )}
      {selectedMovie && <MovieDetailsModal movie={selectedMovie} />}
    </main>
  );
}
