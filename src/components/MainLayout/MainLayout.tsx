import { useState, useEffect } from 'react';
import { Router, useRouter } from 'next/router';
import Search from '@/components/Search/Search';
import Results from '@/components/Results/Results';
import { Loader } from '@/components/Loader/Loader';
import { FooterActions } from '@/components/FooterActions/FooterActions';
import { FlyoutPanel } from '@/components/FlyoutPanel/FlyoutPanel';
import { ResultItem } from '@/models/ResultItem.model';
import { Details } from '@/components/Details/Details';
import { ThemeEnum } from '@/models/Theme.enum';
import { useTheme } from '@/hooks/useTheme.tsx';

const MainLayout = ({
  characters,
  characterDetails = null,
  withDetails,
  error,
}: {
  characters: ResultItem[];
  characterDetails?: ResultItem | null;
  withDetails: boolean;
  error?: string;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { theme } = useTheme();
  const { page } = router.query;
  const currentPage = Number(page) || 1;

  useEffect(() => {
    if (!router.query.page || router.query.page !== '1') {
      router.replace(
        {
          pathname: router.pathname,
          query: { ...router.query, page: '1' },
        },
        undefined,
        { shallow: true }
      );
    }
  }, []);

  useEffect(() => {
    const start = () => setIsLoading(true);
    const stop = () => setIsLoading(false);
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', stop);
    Router.events.on('routeChangeError', stop);

    return () => {
      Router.events.on('routeChangeStart', start);
      Router.events.on('routeChangeComplete', stop);
      Router.events.on('routeChangeError', stop);
    };
  }, []);

  const handleSearch = (newSearchQuery: string) => {
    const query: { page: number; search?: string } = { page: 1 };
    if (newSearchQuery) {
      query.search = newSearchQuery;
    }
    router.push({ query });
  };

  const handlePageChange = (newPage: number) => {
    const query: { page: number; search?: string } = { page: newPage };
    router.push({ pathname: '/', query });
  };

  const isPaginationVisible = characters && characters.length > 0;

  return (
    <>
      <h1
        className={`flex-text ${theme === ThemeEnum.DARK ? 'dark' : 'light'}`}
      >
        swApi search{' '}
      </h1>
      <Search onSearch={handleSearch} />
      {isLoading && <Loader />}
      {!isLoading && (
        <Results
          characters={characters || []}
          searchQuery={''}
          errorMessage={`${error}`}
        >
          {withDetails && <Details characterDetails={characterDetails} />}
        </Results>
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

export default MainLayout;
