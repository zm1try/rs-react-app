import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { useRouter, useSearchParams } from 'next/navigation';
import { ThemeEnum } from '@/models/Theme.enum';
import { Pagination } from '@/components/Pagination/Pagination.tsx';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

const mockStore = configureMockStore();

describe('Pagination', () => {
  let mockRouterPush: vi.Mock;
  let mockRouterReplace: vi.Mock;

  beforeEach(() => {
    mockRouterPush = vi.fn();
    mockRouterReplace = vi.fn();
    (useRouter as vi.Mock).mockReturnValue({
      push: mockRouterPush,
      replace: mockRouterReplace,
    });
    (useSearchParams as vi.Mock).mockReturnValue({
      get: vi.fn((key: string) => (key === 'page' ? '1' : null)),
      toString: vi.fn(() => ''),
    });
  });

  it('renders the pagination buttons and current page', () => {
    const store = mockStore({
      theme: { theme: { state: ThemeEnum.LIGHT } },
    });

    const { getByText } = render(
      <Provider store={store}>
        <Pagination />
      </Provider>
    );

    expect(getByText('Previous')).toBeInTheDocument();
    expect(getByText('Next')).toBeInTheDocument();
    expect(getByText('Page 1')).toBeInTheDocument();
  });

  it('applies the correct theme class based on Redux state', () => {
    const store = mockStore({
      theme: { theme: { state: ThemeEnum.DARK } },
    });

    const { container } = render(
      <Provider store={store}>
        <Pagination />
      </Provider>
    );

    const paginationContainer = container.querySelector(
      '.pagination-container'
    );
    expect(paginationContainer).toHaveClass('dark');
  });

  it('disables the "Previous" button on the first page', () => {
    const store = mockStore({
      theme: { theme: { state: ThemeEnum.LIGHT } },
    });

    const { getByText } = render(
      <Provider store={store}>
        <Pagination />
      </Provider>
    );

    const previousButton = getByText('Previous');
    expect(previousButton).toBeDisabled();
  });

  it('navigates to the next page when "Next" button is clicked', () => {
    const store = mockStore({
      theme: { theme: { state: ThemeEnum.LIGHT } },
    });

    (useSearchParams as vi.Mock).mockReturnValue({
      get: vi.fn((key: string) => (key === 'page' ? '1' : null)),
      toString: vi.fn(() => ''),
    });

    const { getByText } = render(
      <Provider store={store}>
        <Pagination />
      </Provider>
    );

    const nextButton = getByText('Next');
    fireEvent.click(nextButton);

    expect(mockRouterPush).toHaveBeenCalledWith('?page=2');
  });

  it('navigates to the previous page when "Previous" button is clicked', () => {
    const store = mockStore({
      theme: { theme: { state: ThemeEnum.LIGHT } },
    });

    (useSearchParams as vi.Mock).mockReturnValue({
      get: vi.fn((key: string) => (key === 'page' ? '2' : null)),
      toString: vi.fn(() => ''),
    });

    const { getByText } = render(
      <Provider store={store}>
        <Pagination />
      </Provider>
    );

    const previousButton = getByText('Previous');
    fireEvent.click(previousButton);

    expect(mockRouterPush).toHaveBeenCalledWith('?page=1');
  });

  it('does not navigate if the current page is the same as the new page', () => {
    const store = mockStore({
      theme: { theme: { state: ThemeEnum.LIGHT } },
    });

    (useSearchParams as vi.Mock).mockReturnValue({
      get: vi.fn((key: string) => (key === 'page' ? '2' : null)),
      toString: vi.fn(() => ''),
    });

    const { getByText } = render(
      <Provider store={store}>
        <Pagination />
      </Provider>
    );

    const nextButton = getByText('Next');
    fireEvent.click(nextButton);

    expect(mockRouterPush).not.toHaveBeenCalledWith('?page=2');
  });
});
