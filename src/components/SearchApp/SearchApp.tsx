import { useState, useEffect } from 'react';
import { Search } from '../Search/Search';
import { Results } from '../Results/Results';
import { ResultItem } from '../../models/ResultItem.model';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Loader } from '../Loader/Loader';
import { FooterActions } from '../FooterActions/FooterActions';
import { useGetCharactersQuery } from '../../api/swApi';
import { useSearchParams } from 'react-router-dom';
import { FlyoutPanel } from '../FlyoutPanel/FlyoutPanel';
import { ThemeEnum } from '../../models/Theme.enum';
import { useTheme } from '../../hooks/useTheme';

export const SearchApp = () => {
  const [characters, setCharacters] = useState<ResultItem[] | null>([]);
  const { theme } = useTheme();
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('page')) || 1
  );

  const { loadSearchQuery, saveSearchQuery } =
    useLocalStorage('ls-searchQuery');
  const { data, error, isLoading } = useGetCharactersQuery({
    page: currentPage,
    search: loadSearchQuery() || '',
    offset: 0,
  });

  useEffect(() => {
    if (data?.results) {
      setCharacters(data.results);
    }
  }, [data]);

  const handleSearch = (newSearchQuery: string) => {
    saveSearchQuery(newSearchQuery);
    setCurrentPage(currentPage);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const isPaginationVisible = characters && characters.length > 0;

  return (
    <>
      {
        <>
          <h1
            className={`flex-text ${theme === ThemeEnum.DARK ? 'dark' : 'light'}`}
          >
            swApi search{' '}
          </h1>
          <Search onSearch={handleSearch} />
        </>
      }
      {isLoading && <Loader />}
      {!isLoading && (
        <Results
          characters={characters || []}
          searchQuery={loadSearchQuery() ?? ''}
          errorMessage={error instanceof Error ? error.message : `${error}`}
        />
      )}
      <FlyoutPanel />
      <FooterActions
        isPaginationVisible={Boolean(isPaginationVisible)}
        currentPage={currentPage}
        onPreviousPage={() => handlePageChange(currentPage - 1)}
        onNextPage={() => handlePageChange(currentPage + 1)}
      />
    </>
  );
};
