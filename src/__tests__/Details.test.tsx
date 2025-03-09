import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { useRouter, useSearchParams } from 'next/navigation';
import { ThemeEnum } from '@/models/Theme.enum';
import { Details } from '@/components/Details/Details.tsx';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

const mockStore = configureMockStore();

describe('Details', () => {
  let mockRouterPush: vi.Mock;

  beforeEach(() => {
    mockRouterPush = vi.fn();
    (useRouter as vi.Mock).mockReturnValue({
      push: mockRouterPush,
    });
    (useSearchParams as vi.Mock).mockReturnValue({
      toString: vi.fn(() => ''),
    });
  });

  const characterDetailsMock = {
    name: 'Luke Skywalker',
    birth_year: '19BBY',
    url: 'https://swapi.dev/api/people/1/',
  };

  it('renders character details when characterDetails is provided', () => {
    const store = mockStore({
      theme: { theme: { state: ThemeEnum.LIGHT } },
    });

    const { getByText } = render(
      <Provider store={store}>
        <Details characterDetails={characterDetailsMock} />
      </Provider>
    );

    expect(getByText('Name: Luke Skywalker')).toBeInTheDocument();
    expect(getByText('Birth year: 19BBY')).toBeInTheDocument();
  });

  it('applies the correct theme class based on Redux state', () => {
    const store = mockStore({
      theme: { theme: { state: ThemeEnum.DARK } },
    });

    const { container } = render(
      <Provider store={store}>
        <Details characterDetails={characterDetailsMock} />
      </Provider>
    );

    const detailsContainer = container.querySelector('.details-container');
    expect(detailsContainer).toHaveClass('dark');
  });

  it('navigates to the main page when the "Close" button is clicked', () => {
    const store = mockStore({
      theme: { theme: { state: ThemeEnum.LIGHT } },
    });

    const { getByText } = render(
      <Provider store={store}>
        <Details characterDetails={characterDetailsMock} />
      </Provider>
    );

    const closeButton = getByText('Close');
    fireEvent.click(closeButton);

    expect(mockRouterPush).toHaveBeenCalledWith('/?page=1');
  });

  it('does not render anything when characterDetails is null', () => {
    const store = mockStore({
      theme: { theme: { state: ThemeEnum.LIGHT } },
    });

    const { container } = render(
      <Provider store={store}>
        <Details characterDetails={null} />
      </Provider>
    );

    expect(container.firstChild).toBeNull();
  });
});
