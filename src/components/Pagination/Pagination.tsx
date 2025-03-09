import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ThemeEnum } from '@/models/Theme.enum';
import { useTheme } from '@/hooks/useTheme.tsx';

type PaginationProps = {
  currentPage: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
};

export const Pagination = ({
  currentPage,
  onPreviousPage,
  onNextPage,
}: PaginationProps) => {
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    const page = parseInt(router.query.page as string) || 1;
    if (page !== currentPage) {
      router.replace(
        {
          pathname: router.pathname,
          query: { ...router.query, page: currentPage.toString() },
        },
        undefined,
        { shallow: true }
      );
    }
  }, [router, currentPage]);

  return (
    <div
      className={`pagination-container flex-text ${theme === ThemeEnum.DARK ? 'dark' : 'light'}`}
    >
      <button onClick={onPreviousPage} disabled={currentPage === 1}>
        Previous
      </button>
      <div>
        <span>Page {currentPage}</span>
      </div>
      <button onClick={onNextPage}>Next</button>
    </div>
  );
};
