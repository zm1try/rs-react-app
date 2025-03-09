import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { ThemeEnum } from '@/models/Theme.enum';
import { ResultItem } from '@/models/ResultItem.model.ts';
import MainLayout from '@/components/MainLayout/MainLayout.tsx';

vi.mock('@/components/Search/Search', () => ({
  default: () => <div data-testid="search">Search Component</div>,
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
    isPaginationVisible,
  }: {
    isPaginationVisible: boolean;
  }) => (
    <div data-testid="footer-actions">
      {isPaginationVisible ? 'Pagination Visible' : 'Pagination Hidden'}
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
  const mockCharacters = [
    { name: 'Character 1' },
    { name: 'Character 2' },
  ] as ResultItem[];

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

  it('renders the Search component', () => {
    const store = mockStore({
      theme: { theme: { state: ThemeEnum.LIGHT } },
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <MainLayout characters={[]} withDetails={false} />
      </Provider>
    );

    expect(getByTestId('search')).toBeInTheDocument();
  });

  it('renders the Results component with the correct props', () => {
    const store = mockStore({
      theme: { theme: { state: ThemeEnum.LIGHT } },
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <MainLayout characters={mockCharacters} withDetails={false} error="" />
      </Provider>
    );

    const results = getByTestId('results');
    expect(results).toHaveTextContent('Results Found');
  });

  it('does not render the Details component when withDetails is false', () => {
    const store = mockStore({
      theme: { theme: { state: ThemeEnum.LIGHT } },
    });

    const { queryByTestId } = render(
      <Provider store={store}>
        <MainLayout characters={mockCharacters} withDetails={false} />
      </Provider>
    );

    expect(queryByTestId('details')).toBeNull();
  });

  it('renders the FlyoutPanel component', () => {
    const store = mockStore({
      theme: { theme: { state: ThemeEnum.LIGHT } },
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <MainLayout characters={mockCharacters} withDetails={false} />
      </Provider>
    );

    expect(getByTestId('flyout-panel')).toBeInTheDocument();
  });

  it('renders the FooterActions component with the correct isPaginationVisible prop', () => {
    const store = mockStore({
      theme: { theme: { state: ThemeEnum.LIGHT } },
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <MainLayout characters={mockCharacters} withDetails={false} />
      </Provider>
    );

    const footerActions = getByTestId('footer-actions');
    expect(footerActions).toHaveTextContent('Pagination Visible');
  });

  it('hides pagination when there are no characters', () => {
    const store = mockStore({
      theme: { theme: { state: ThemeEnum.LIGHT } },
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <MainLayout characters={[]} withDetails={false} />
      </Provider>
    );

    const footerActions = getByTestId('footer-actions');
    expect(footerActions).toHaveTextContent('Pagination Hidden');
  });
});
