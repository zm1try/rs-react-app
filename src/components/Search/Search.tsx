import { useState } from 'react';
import type { FormEvent } from 'react';
import { ThemeSwitcher } from '@/components/ThemeSwitcher/ThemeSwitcher';
import { useSearchParams, useRouter } from 'next/navigation'; // Use App Router utilities

function Search() {
  const router = useRouter();
  const searchParams = useSearchParams(); // Access query parameters
  const [searchQuery, saveSearchQuery] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>(searchQuery);

  const handleChange = (value: string) => {
    setInputValue(value || '');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentSearchQuery = inputValue?.trim() || '';
    saveSearchQuery(currentSearchQuery);

    const params = new URLSearchParams(searchParams.toString());
    if (currentSearchQuery) {
      params.set('search', currentSearchQuery);
    } else {
      params.delete('search');
    }
    params.set('page', '1');
    router.push(`?${params.toString()}`);
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
