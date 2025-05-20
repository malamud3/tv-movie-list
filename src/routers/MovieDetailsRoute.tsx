import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const MovieDetailsRoute = () => {
  const { id } = useParams();

  const {
    data: movie,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => fetchMovieById(id!),
    enabled: !!id,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load movie</div>;
  if (!movie) return null;

  return <MovieDetailsModal movie={movie} />;
};

export default MovieDetailsRoute;
