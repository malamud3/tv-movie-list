import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { API_tmdb } from '../services/API_Tmdb';
import { tmdbActions } from '../interface/Consts';
import { Show } from '../interface/TmdbTypes';
import { MovieList } from '../components/MovieList/MovieList';
import MovieModal from '../pages/MovieDetailsPage';

export default function HomePage() {
  const [selectedMovie, setSelectedMovie] = useState<Show | null>(null);
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

  const handleSelectMovie = (movie: Show) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

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
        movies && (
          <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
        )
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </main>
  );
}
