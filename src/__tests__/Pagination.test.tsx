import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';
import { ThemeEnum } from '@/models/Theme.enum';
import { useTheme } from '@/hooks/useTheme.tsx';
import { Pagination } from '@/components/Pagination/Pagination.tsx';
import { NextParsedUrlQuery } from 'next/dist/server/request-meta';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

vi.mock('@/hooks/useTheme.tsx', () => ({
  useTheme: vi.fn(),
}));

describe('Pagination', () => {
  let mockRouterReplace: vi.Mock;
  let mockRouterQuery: NextParsedUrlQuery;

  beforeEach(() => {
    mockRouterReplace = vi.fn();
    mockRouterQuery = { page: '1' };

    (useRouter as vi.Mock).mockReturnValue({
      pathname: '/test',
      query: mockRouterQuery,
      replace: mockRouterReplace,
    });

    (useTheme as vi.Mock).mockReturnValue({
      theme: ThemeEnum.LIGHT,
    });
  });

  const mockOnPreviousPage = vi.fn();
  const mockOnNextPage = vi.fn();

  it('renders the pagination buttons and current page', () => {
    const { getByText } = render(
      <Pagination
        currentPage={1}
        onPreviousPage={mockOnPreviousPage}
        onNextPage={mockOnNextPage}
      />
    );

    expect(getByText('Previous')).toBeInTheDocument();
    expect(getByText('Next')).toBeInTheDocument();
    expect(getByText('Page 1')).toBeInTheDocument();
  });

  it('applies the correct theme class based on the current theme', () => {
    const { container } = render(
      <Pagination
        currentPage={1}
        onPreviousPage={mockOnPreviousPage}
        onNextPage={mockOnNextPage}
      />
    );

    const paginationContainer = container.querySelector(
      '.pagination-container'
    );
    expect(paginationContainer).toHaveClass('light');
  });

  it('updates the theme class when the theme changes', () => {
    (useTheme as vi.Mock).mockReturnValueOnce({
      theme: ThemeEnum.DARK,
    });

    const { container } = render(
      <Pagination
        currentPage={1}
        onPreviousPage={mockOnPreviousPage}
        onNextPage={mockOnNextPage}
      />
    );

    const paginationContainer = container.querySelector(
      '.pagination-container'
    );
    expect(paginationContainer).toHaveClass('dark');
  });

  it('disables the "Previous" button on the first page', () => {
    const { getByText } = render(
      <Pagination
        currentPage={1}
        onPreviousPage={mockOnPreviousPage}
        onNextPage={mockOnNextPage}
      />
    );

    const previousButton = getByText('Previous');
    expect(previousButton).toBeDisabled();
  });

  it('calls onPreviousPage when the "Previous" button is clicked', () => {
    const { getByText } = render(
      <Pagination
        currentPage={2}
        onPreviousPage={mockOnPreviousPage}
        onNextPage={mockOnNextPage}
      />
    );

    const previousButton = getByText('Previous');
    fireEvent.click(previousButton);

    expect(mockOnPreviousPage).toHaveBeenCalled();
  });

  it('calls onNextPage when the "Next" button is clicked', () => {
    const { getByText } = render(
      <Pagination
        currentPage={1}
        onPreviousPage={mockOnPreviousPage}
        onNextPage={mockOnNextPage}
      />
    );

    const nextButton = getByText('Next');
    fireEvent.click(nextButton);

    expect(mockOnNextPage).toHaveBeenCalled();
  });

  it('updates the query parameters when currentPage changes', () => {
    render(
      <Pagination
        currentPage={2}
        onPreviousPage={mockOnPreviousPage}
        onNextPage={mockOnNextPage}
      />
    );

    expect(mockRouterReplace).toHaveBeenCalledWith(
      {
        pathname: '/test',
        query: { ...mockRouterQuery, page: '2' },
      },
      undefined,
      { shallow: true }
    );
  });

  it('does not update the query parameters if the page is already correct', () => {
    mockRouterQuery.page = '2';

    render(
      <Pagination
        currentPage={2}
        onPreviousPage={mockOnPreviousPage}
        onNextPage={mockOnNextPage}
      />
    );

    expect(mockRouterReplace).not.toHaveBeenCalled();
  });
});
