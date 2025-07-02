import { useState, useCallback } from 'react';

type FavoriteItem = {
  id: number;
  title: string;
  poster_path: string;
  overview?: string;
  vote_average?: number;
  media_type?: 'movie' | 'tv';
};

/**
 * Custom hook for managing favorite items
 * In a real app, this would sync with a backend or local storage
 */
export const useFavorites = () => {
  // In a real app, this would be loaded from localStorage or an API
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  const isFavorite = useCallback((id: number) => {
    return favorites.some(item => item.id === id);
  }, [favorites]);

  const addFavorite = useCallback((item: FavoriteItem) => {
    setFavorites(prev => {
      if (prev.some(fav => fav.id === item.id)) {
        return prev; // Already in favorites
      }
      return [...prev, item];
    });
  }, []);

  const removeFavorite = useCallback((id: number) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
  }, []);

  const toggleFavorite = useCallback((item: FavoriteItem) => {
    if (isFavorite(item.id)) {
      removeFavorite(item.id);
    } else {
      addFavorite(item);
    }
  }, [isFavorite, addFavorite, removeFavorite]);

  return {
    favorites,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    favoriteCount: favorites.length
  };
};

export default useFavorites;
