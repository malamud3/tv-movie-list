const MovieDetailsPage = () => {
  // Example movie data
  const movie = {
    title: 'Inception',
    releaseYear: 2010,
    director: 'Christopher Nolan',
    description:
      'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>
        {movie.title} ({movie.releaseYear})
      </h1>
      <h3>Directed by: {movie.director}</h3>
      <p>{movie.description}</p>
    </div>
  );
};

export default MovieDetailsPage;
