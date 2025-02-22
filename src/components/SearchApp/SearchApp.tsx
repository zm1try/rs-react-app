import { useState, useEffect, useCallback } from 'react';
import { Search } from '../Search/Search';
import { Results } from '../Results/Results';
import { ResultItem } from '../../models/ResultItem.model';
import { useLocalStorage } from '../../services/useLocalStorage';
import { swapiService } from '../../services/swapiService';
import { Loader } from '../Loader/Loader';
import { FooterActions } from '../FooterActions/FooterActions';

export const SearchApp = () => {
  const [characters, setCharacters] = useState<ResultItem[] | null>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { loadSearchQuery, saveSearchQuery } =
    useLocalStorage('ls-searchQuery');

  const loadData = useCallback(async (query: string, page: number) => {
    setLoading(true);

    try {
      const { characters = [] } = await swapiService.fetchCharacters(
        query,
        page
      );
      setCharacters(characters);
      setLoading(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : `${error}`;
      setErrorMessage(errorMessage);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const initialSearchQuery = loadSearchQuery() || '';
    loadData(initialSearchQuery, 1);
  }, [loadSearchQuery, loadData]);

  const handleSearch = (newSearchQuery: string) => {
    saveSearchQuery(newSearchQuery);
    setCurrentPage(currentPage);
    setLoading(true);
    loadData(newSearchQuery, 1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setLoading(true);
    loadData(loadSearchQuery() ?? '', page);
  };

  const isPaginationVisible = characters && characters.length > 0;

  return (
    <>
      <h1>swapi search</h1>
      <Search onSearch={handleSearch} />
      {loading ? (
        <Loader />
      ) : (
        <Results
          characters={characters}
          searchQuery={loadSearchQuery() ?? ''}
          errorMessage={errorMessage}
        />
      )}
      <FooterActions
        isPaginationVisible={Boolean(isPaginationVisible)}
        currentPage={currentPage}
        onPreviousPage={() => handlePageChange(currentPage - 1)}
        onNextPage={() => handlePageChange(currentPage + 1)}
      />
    </>
  );
};
