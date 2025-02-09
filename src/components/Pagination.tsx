import './Pagination.css';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

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

  useEffect(() => {
    if (searchParams.get('page') !== currentPage.toString()) {
      setSearchParams({
        ...Object.fromEntries(searchParams),
        page: currentPage.toString(),
      });
    }
  }, [searchParams, setSearchParams, currentPage]);

  return (
    <div className="pagination-container">
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
