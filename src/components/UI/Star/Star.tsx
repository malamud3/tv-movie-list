import { useState } from 'react';
import classes from './Star.module.css';

type StarProps = {
  /** Whether the item is currently favorited */
  isFavorite?: boolean;
  /** Callback when favorite status changes */
  onToggleFavorite?: (isFavorite: boolean) => void;
  /** Size of the star icon */
  size?: 'small' | 'medium' | 'large';
  /** Whether the star is interactive */
  interactive?: boolean;
  /** Additional CSS classes */
  className?: string;
};

export const Star = ({ 
  isFavorite = false, 
  onToggleFavorite, 
  size = 'medium',
  interactive = true,
  className = ''
}: StarProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (interactive && onToggleFavorite) {
      onToggleFavorite(!isFavorite);
    }
  };

  const handleMouseEnter = () => {
    if (interactive) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setIsHovered(false);
    }
  };

  return (
    <button
      className={`${classes.star} ${classes[size]} ${isFavorite ? classes.filled : classes.empty} ${
        interactive ? classes.interactive : classes.static
      } ${className}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      disabled={!interactive}
      type="button"
    >
      <svg
        viewBox="0 0 24 24"
        className={`${classes.starIcon} ${isHovered ? classes.hovered : ''}`}
        fill={isFavorite ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
      >
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
      </svg>
    </button>
  );
};

export default Star;
