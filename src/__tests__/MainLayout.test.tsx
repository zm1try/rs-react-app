import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { useRouter, Router } from 'next/router';
import { ThemeEnum } from '@/models/Theme.enum';
import MainLayout from '@/components/MainLayout/MainLayout';
import { ResultItem } from '@/models/ResultItem.model';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
  Router: {
    events: {
      on: vi.fn(),
      off: vi.fn(),
    },
  },
}));

vi.mock('@/components/Search/Search', () => ({
  default: ({ onSearch }: { onSearch: (query: string) => void }) => (
    <button data-testid="search-button" onClick={() => onSearch('test-query')}>
      Search
    </button>
  ),
}));

vi.mock('@/components/Results/Results', () => ({
  default: ({
    characters,
    errorMessage,
  }: {
    characters: ResultItem[];
    errorMessage: string;
  }) => (
    <div data-testid="results">
      {characters.length > 0 ? 'Results Found' : errorMessage}
    </div>
  ),
}));

vi.mock('@/components/Loader/Loader', () => ({
  Loader: () => <div data-testid="loader">Loading...</div>,
}));

vi.mock('@/components/FooterActions/FooterActions', () => ({
  FooterActions: ({
    currentPage,
    onPreviousPage,
    onNextPage,
  }: {
    currentPage: number;
    onPreviousPage: () => void;
    onNextPage: () => void;
  }) => (
    <div data-testid="footer-actions">
      <button data-testid="previous-page" onClick={onPreviousPage}>
        Previous
      </button>
      <button data-testid="next-page" onClick={onNextPage}>
        Next
      </button>
      <span>Page {currentPage}</span>
    </div>
  ),
}));

vi.mock('@/components/FlyoutPanel/FlyoutPanel', () => ({
  FlyoutPanel: () => <div data-testid="flyout-panel">Flyout Panel</div>,
}));

vi.mock('@/components/Details/Details', () => ({
  Details: ({ characterDetails }: { characterDetails: ResultItem }) => (
    <div data-testid="details">
      {characterDetails ? 'Details Found' : 'No Details'}
    </div>
  ),
}));

const mockStore = configureMockStore();

describe('MainLayout', () => {
  let mockRouterPush: vi.Mock;

  beforeEach(() => {
    mockRouterPush = vi.fn();
    (useRouter as vi.Mock).mockReturnValue({
      query: { page: '1' },
      pathname: '/test',
      push: mockRouterPush,
      replace: vi.fn(),
    });

    Router.events.on.mockClear();
    Router.events.off.mockClear();
  });

  it('renders the header with the correct theme', () => {
    const store = mockStore({
      theme: { theme: { state: ThemeEnum.DARK } },
    });

    const { getByText } = render(
      <Provider store={store}>
        <MainLayout characters={[]} withDetails={false} />
      </Provider>
    );

    const header = getByText('swApi search');
    expect(header).toHaveClass('dark');
  });

  it('renders the Loader when isLoading is true', async () => {
    const store = mockStore({
      theme: { theme: { state: ThemeEnum.LIGHT } },
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <MainLayout characters={[]} withDetails={false} />
      </Provider>
    );

    Router.events.on.mock.calls[0][1]();
    await waitFor(() => expect(getByTestId('loader')).toBeInTheDocument());
  });

  it('renders Results when isLoading is false', async () => {
    const store = mockStore({
      theme: { theme: { state: ThemeEnum.LIGHT } },
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <MainLayout
          characters={[{ name: 'Character 1' }]}
          withDetails={false}
        />
      </Provider>
    );

    Router.events.on.mock.calls[1][1]();
    await waitFor(() =>
      expect(getByTestId('results')).toHaveTextContent('Results Found')
    );
  });

  it('handles search queries correctly', () => {
    const store = mockStore({
      theme: { theme: { state: ThemeEnum.LIGHT } },
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <MainLayout characters={[]} withDetails={false} />
      </Provider>
    );

    const searchButton = getByTestId('search-button');
    fireEvent.click(searchButton);

    expect(mockRouterPush).toHaveBeenCalledWith({
      query: { page: 1, search: 'test-query' },
    });
  });

  it('handles pagination correctly', () => {
    const store = mockStore({
      theme: { theme: { state: ThemeEnum.LIGHT } },
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <MainLayout
          characters={[{ name: 'Character 1' }]}
          withDetails={false}
        />
      </Provider>
    );

    const nextPageButton = getByTestId('next-page');
    fireEvent.click(nextPageButton);

    expect(mockRouterPush).toHaveBeenCalledWith({
      pathname: '/',
      query: { page: 2 },
    });

    const previousPageButton = getByTestId('previous-page');
    fireEvent.click(previousPageButton);

    expect(mockRouterPush).toHaveBeenCalledWith({
      pathname: '/',
      query: { page: 0 },
    });
  });

  it('renders FlyoutPanel and FooterActions', () => {
    const store = mockStore({
      theme: { theme: { state: ThemeEnum.LIGHT } },
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <MainLayout
          characters={[{ name: 'Character 1' }]}
          withDetails={false}
        />
      </Provider>
    );

    expect(getByTestId('flyout-panel')).toBeInTheDocument();
    expect(getByTestId('footer-actions')).toBeInTheDocument();
  });
});
