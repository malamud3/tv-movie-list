import { useFavorites } from '../../util/hooks/useFavorites';
import { ImgCell } from '../UI/ImgCell/ImgCell';
import { Link } from 'react-router-dom';
import classes from './FavoritesList.module.css';

export const FavoritesList = () => {
  const { favorites, toggleFavorite } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className={classes.emptyState}>
        <div className={classes.emptyIcon}>⭐</div>
        <h3 className={classes.emptyTitle}>No Favorites Yet</h3>
        <p className={classes.emptyDescription}>
          Click the star icon on any movie or TV show to add it to your favorites list.
        </p>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Your Favorites ({favorites.length})</h2>
      <div className={classes.grid}>
        {favorites.map((item) => (
          <div key={item.id} className={classes.favoriteItem}>
            <Link
              to={`/${item.id}`}
              state={{ item }}
              aria-label={`View details for ${item.title}`}
            >
              <ImgCell
                posterPath={item.poster_path}
                title={item.title}
                overview={item.overview}
                rating={item.vote_average}
                isFavorite={true}
                onToggleFavorite={() => toggleFavorite(item)}
                showRating={true}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;
