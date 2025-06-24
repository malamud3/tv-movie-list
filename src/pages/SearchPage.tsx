import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ListController from '../components/MovieList/ListController';
import { tmdbActions } from '../interface/Consts';
import SearchBar from '../components/SearchBar/SearchBar';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchType, setSearchType] = useState<'MOVIES' | 'TV_SHOWS'>('MOVIES');
  const query = searchParams.get('q') || '';

  const handleSearch = (searchQuery: string, type: 'MOVIES' | 'TV_SHOWS') => {
    setSearchParams({ q: searchQuery });
    setSearchType(type);
  };

  return (
    <main>
      <SearchBar
        initialQuery={query}
        initialType={searchType}
        onSearch={handleSearch}
      />

      {query && (
        <ListController
          key={`search-${searchType}-${query}`}
          type={searchType}
          title={`Search Results for "${query}"`}
          fetchFunction="search"
          query={query}
        />
      )}
    </main>
  );
}
