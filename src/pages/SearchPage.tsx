import { useState, useCallback } from 'react';
import ListController from '../components/MovieList/ListController';
import { tmdbActions } from '../interface/Consts';
import styles from './SearchPage.module.css';

type ContentType = 'MOVIES' | 'TV_SHOWS';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<ContentType>('MOVIES');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value as ContentType);
  };

  const renderResults = useCallback(() => {
    return (
      <ListController
        type={selectedType}
        title={`Search Results for ""`}
        fetchFunction={tmdbActions.search}
        listType="vertical"
        selectedId={undefined}
      />
    );
  }, [selectedType]);

  return (
    <div className={styles.searchPage}>
      <h1>Search for Movies or TV Shows</h1>
      <div className={styles.searchControls}>
        <input
          type="text"
          placeholder="Search..."
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
