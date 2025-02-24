import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { ThemeEnum } from '../../models/Theme.enum';
import { useTheme } from '../../hooks/useTheme';

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
  const [searchParams, setSearchParams] = useSearchParams();
  const { theme } = useTheme();
  useEffect(() => {
    if (searchParams.get('page') !== currentPage.toString()) {
      setSearchParams({
        ...Object.fromEntries(searchParams),
        page: currentPage.toString(),
      });
    }
  }, [searchParams, setSearchParams, currentPage]);

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
