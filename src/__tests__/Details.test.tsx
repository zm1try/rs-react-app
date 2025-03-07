import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { useRouter } from 'next/router';
import { ThemeEnum } from '@/models/Theme.enum.ts';
import { Details } from '@/components/Details/Details.tsx';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

const mockStore = configureMockStore();
const characterDetailsMock = {
  id: '1',
  name: 'Test Character',
  birth_year: '19BBY',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  origin: { name: 'Earth' },
  location: { name: 'Earth' },
  image: 'test_image.jpg',
};

describe('Details', () => {
  let mockPush: vi.Mock;

  beforeEach(() => {
    mockPush = vi.fn();
    (useRouter as vi.Mock).mockReturnValue({ push: mockPush });
  });

  it('renders correctly with light theme', () => {
    const store = mockStore({
      theme: { theme: { state: ThemeEnum.LIGHT } },
    });

    const { getByText, container } = render(
      <Provider store={store}>
        <Details characterDetails={characterDetailsMock} />
      </Provider>
    );

    expect(getByText(`Name: ${characterDetailsMock.name}`)).toBeInTheDocument();
    expect(
      getByText(`Birth year: ${characterDetailsMock.birth_year}`)
    ).toBeInTheDocument();
    expect(container.querySelector('.details-container')).toHaveClass('light');
  });

  it('renders correctly with dark theme', () => {
    const store = mockStore({
      theme: { theme: { state: ThemeEnum.DARK } },
    });

    const { getByText, container } = render(
      <Provider store={store}>
        <Details characterDetails={characterDetailsMock} />
      </Provider>
    );

    expect(getByText(`Name: ${characterDetailsMock.name}`)).toBeInTheDocument();
    expect(
      getByText(`Birth year: ${characterDetailsMock.birth_year}`)
    ).toBeInTheDocument();
    expect(container.querySelector('.details-container')).toHaveClass('dark');
  });

  it('does not render if characterDetails is null', () => {
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

  it('navigates to the main page when the Close button is clicked', () => {
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

    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('renders with the correct theme class based on Redux state', () => {
    const themes = [ThemeEnum.LIGHT, ThemeEnum.DARK];
    themes.forEach((theme) => {
      const store = mockStore({
        theme: { theme: { state: theme } },
      });

      const { container } = render(
        <Provider store={store}>
          <Details characterDetails={characterDetailsMock} />
        </Provider>
      );

      const detailsContainer = container.querySelector('.details-container');
      expect(detailsContainer).toHaveClass(
        theme === ThemeEnum.DARK ? 'dark' : 'light'
      );
    });
  });
});
