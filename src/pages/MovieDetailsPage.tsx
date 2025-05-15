import { Show } from '../interface/TmdbTypes';
import Modal from '../components/UI/Modal.jsx';

type MovieModalProps = {
  movie: Show;
  onClose: () => void;
};

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <Modal onClose={onClose}>
      <div className="modal-content">
        <h2>{movie.title || movie.title}</h2>
        <div className="flex">
          <img
            src={imageUrl}
            alt={movie.title || movie.title || 'Movie Poster'}
          />
          <div className="details">
            <p>
              <strong>Rating:</strong> {movie.vote_average}/10 (
              {movie.vote_count} votes)
            </p>
            <p>
              <strong>Release Date:</strong>{' '}
              {movie.release_date || movie.first_air_date}
            </p>
            <p>
              <strong>Overview:</strong> {movie.overview}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MovieModal;
