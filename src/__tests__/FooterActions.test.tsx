import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { Pagination } from '../components/Pagination/Pagination';
// import { ThrowErrorButton } from '../ThrowErrorButton/ThrowErrorButton';
import { FooterActions } from '@/components/FooterActions/FooterActions.tsx';

vi.mock('../components/Pagination/Pagination', () => ({
  Pagination: vi.fn(() => <div data-testid="pagination-mock">Pagination</div>),
}));

vi.mock('../components/ThrowErrorButton/ThrowErrorButton', () => ({
  ThrowErrorButton: vi.fn(() => (
    <button data-testid="throw-error-button">Throw Error</button>
  )),
}));

describe('FooterActions', () => {
  it('renders the Pagination component when isPaginationVisible is true', () => {
    const { getByTestId } = render(
      <FooterActions
        isPaginationVisible={true}
        currentPage={1}
        onPreviousPage={vi.fn()}
        onNextPage={vi.fn()}
      />
    );

    expect(getByTestId('pagination-mock')).toBeInTheDocument();
  });

  it('does not render the Pagination component when isPaginationVisible is false', () => {
    const { queryByTestId } = render(
      <FooterActions
        isPaginationVisible={false}
        currentPage={1}
        onPreviousPage={vi.fn()}
        onNextPage={vi.fn()}
      />
    );

    expect(queryByTestId('pagination-mock')).not.toBeInTheDocument();
  });

  it('renders the ThrowErrorButton component', () => {
    const { getByTestId } = render(
      <FooterActions
        isPaginationVisible={true}
        currentPage={1}
        onPreviousPage={vi.fn()}
        onNextPage={vi.fn()}
      />
    );

    expect(getByTestId('throw-error-button')).toBeInTheDocument();
  });

  it('calls onPreviousPage with the correct argument when the previous page button is clicked', () => {
    const onPreviousPageMock = vi.fn();
    const currentPage = 2;

    (Pagination as vi.Mock).mockImplementation(({ onPreviousPage }) => (
      <button data-testid="previous-page-button" onClick={onPreviousPage}>
        Previous
      </button>
    ));

    const { getByTestId } = render(
      <FooterActions
        isPaginationVisible={true}
        currentPage={currentPage}
        onPreviousPage={onPreviousPageMock}
        onNextPage={vi.fn()}
      />
    );

    const previousButton = getByTestId('previous-page-button');
    fireEvent.click(previousButton);

    expect(onPreviousPageMock).toHaveBeenCalledWith(currentPage - 1);
  });

  it('calls onNextPage with the correct argument when the next page button is clicked', () => {
    const onNextPageMock = vi.fn();
    const currentPage = 2;

    (Pagination as vi.Mock).mockImplementation(({ onNextPage }) => (
      <button data-testid="next-page-button" onClick={onNextPage}>
        Next
      </button>
    ));

    const { getByTestId } = render(
      <FooterActions
        isPaginationVisible={true}
        currentPage={currentPage}
        onPreviousPage={vi.fn()}
        onNextPage={onNextPageMock}
      />
    );

    const nextButton = getByTestId('next-page-button');
    fireEvent.click(nextButton);

    expect(onNextPageMock).toHaveBeenCalledWith(currentPage + 1);
  });
});
