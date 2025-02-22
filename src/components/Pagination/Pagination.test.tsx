import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from './Pagination';
import { MemoryRouter } from 'react-router-dom';

const mockSetSearchParams = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: () => {
    const searchParams = new URLSearchParams(window.location.search);
    return [searchParams, mockSetSearchParams];
  },
}));

describe('Pagination', () => {
  beforeEach(() => {
    mockSetSearchParams.mockClear();
  });

  it('updates search params when currentPage changes', () => {
    render(
      <MemoryRouter initialEntries={['/?page=2']}>
        <Pagination
          currentPage={2}
          onPreviousPage={jest.fn()}
          onNextPage={jest.fn()}
        />
      </MemoryRouter>
    );

    expect(mockSetSearchParams).toHaveBeenCalledWith({
      page: '2',
    });
  });

  it('calls onPreviousPage when Previous button is clicked', () => {
    const handlePreviousPage = jest.fn();
    render(
      <MemoryRouter initialEntries={['/?page=2']}>
        <Pagination
          currentPage={2}
          onPreviousPage={handlePreviousPage}
          onNextPage={jest.fn()}
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Previous'));
    expect(handlePreviousPage).toHaveBeenCalled();
  });

  it('calls onNextPage when Next button is clicked', () => {
    const handleNextPage = jest.fn();
    render(
      <MemoryRouter initialEntries={['/?page=2']}>
        <Pagination
          currentPage={2}
          onPreviousPage={jest.fn()}
          onNextPage={handleNextPage}
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Next'));
    expect(handleNextPage).toHaveBeenCalled();
  });

  it('disables Previous button on first page', () => {
    render(
      <MemoryRouter initialEntries={['/?page=1']}>
        <Pagination
          currentPage={1}
          onPreviousPage={jest.fn()}
          onNextPage={jest.fn()}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Previous')).toBeDisabled();
  });
});
