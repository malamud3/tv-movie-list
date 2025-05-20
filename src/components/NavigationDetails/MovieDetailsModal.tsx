import { useNavigate } from 'react-router-dom';
import { Show } from '../../interface/TmdbTypes.ts';
import Modal from '../UI/Modal.tsx';

type MovieDetailsModalProps = {
  movie: Show;
  onClose: () => void;
};

const MovieDetailsModal = ({ movie }: MovieDetailsModalProps) => {
  const navigate = useNavigate();
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <Modal onClose={() => navigate('../')}>
      <div className="modal-content">
        <h2>{movie.title}</h2>
        <div className="flex">
          <img src={imageUrl} alt={movie.title || 'Movie Poster'} />
          <div className="details">
            <p>
              <strong>Rating:</strong> {movie.vote_average}/10 (
              {movie.vote_count} votes)
            </p>
            <p>
              <strong>Release Date:</strong> {movie.release_date || ''}
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

export default MovieDetailsModal;
