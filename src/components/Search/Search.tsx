import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { ThemeSwitcher } from '@/components/ThemeSwitcher/ThemeSwitcher';
import { useRouter } from 'next/router';

type SearchFormProps = {
  onSearch: (query: string) => void;
};

function Search({ onSearch }: SearchFormProps) {
  const router = useRouter();

  const [searchQuery, saveSearchQuery] = useState<string>('');

  useEffect(() => {
    if (!router.query.search && inputValue) {
      setInputValue('');
    }
  }, [router.query.search]);

  const [inputValue, setInputValue] = useState<string>(searchQuery);

  const handleChange = (value: string) => {
    setInputValue(value || '');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentSearchQuery = inputValue?.trim() || '';
    saveSearchQuery(currentSearchQuery);
    onSearch(currentSearchQuery);
  };

  return (
    <div className={'search-container'}>
      <form title="form" className={'search-form'} onSubmit={handleSubmit}>
        <input
          type="search"
          value={inputValue}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Enter something to search"
        />
        <button type="submit">Search</button>
      </form>
      <ThemeSwitcher />
    </div>
  );
}

export default Search;
