import { useEffect, useRef } from 'react';
import type { FormEvent } from 'react';
import { useLocalStorage } from '../../services/useLocalStorage';
import { useNavigate } from 'react-router-dom';

type SearchFormProps = {
  onSearch: (query: string) => void;
};

export function Search({ onSearch }: SearchFormProps) {
  const navigate = useNavigate();
  const searchInput = useRef<HTMLInputElement | null>(null);
  const { loadSearchQuery, saveSearchQuery } =
    useLocalStorage('ls-searchQuery');

  useEffect(() => {
    const cachedValue = loadSearchQuery();
    navigate('/');
    if (cachedValue && searchInput.current) {
      searchInput.current.value = cachedValue;
    }
  }, [navigate, loadSearchQuery]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchQuery = searchInput.current?.value?.trim() || '';
    saveSearchQuery(searchQuery && searchQuery);
    onSearch(searchQuery || '');
  };

  return (
    <div>
      <form title="form" className={'search-container'} onSubmit={handleSubmit}>
        <input
          type="search"
          ref={searchInput}
          placeholder="Enter something to search"
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
