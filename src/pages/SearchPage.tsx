import { useState, useCallback, useMemo } from 'react';
import ListController from '../components/MovieList/ListController';
import { tmdbActions } from '../interface/Consts';
import { useDebounce } from '../util/hooks/useDebounce';
import styles from './SearchPage.module.css';

type ContentType = 'MOVIES' | 'TV_SHOWS';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<ContentType>('MOVIES');
  
  // Debounce the search query to avoid excessive API calls
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value as ContentType);
  };

  // Trim the debounced search query and check if it's valid for searching
  const trimmedQuery = debouncedSearchQuery.trim();
  const hasValidQuery = trimmedQuery.length >= 2; // Minimum 2 characters for search

  // Memoize the title to avoid unnecessary re-renders
  const searchTitle = useMemo(() => {
    if (!hasValidQuery) {
      return 'Enter a search term to find movies and TV shows';
    }
    return `Search Results for "${trimmedQuery}"`;
  }, [trimmedQuery, hasValidQuery]);

  const renderResults = useCallback(() => {
    if (!hasValidQuery) {
      return (
        <div className={styles.prompt}>
          <p>Please enter at least 2 characters to start searching...</p>
        </div>
      );
    }

    return (
      <div className={styles.resultsContainer}>
        <ListController
          type={selectedType}
          title={searchTitle}
          fetchFunction={tmdbActions.search}
          listType="vertical"
          selectedId={undefined}
          query={trimmedQuery}
          enabled={hasValidQuery}
        />
      </div>
    );
  }, [selectedType, searchTitle, trimmedQuery, hasValidQuery]);

  return (
    <div className={styles.searchPage}>
      <h1>Search for Movies or TV Shows</h1>
      <div className={styles.searchControls}>
        <input
          type="text"
          placeholder="Search for movies, TV shows..."
          value={searchQuery}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
        <select
          value={selectedType}
          onChange={handleTypeChange}
          className={styles.typeSelect}
        >
          <option value="MOVIES">Movies</option>
          <option value="TV_SHOWS">TV Shows</option>
        </select>
      </div>
      {renderResults()}
    </div>
  );
}
