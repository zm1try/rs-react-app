import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { ThemeEnum } from '@/models/Theme.enum';
import Card from '@/components/Card/Card';

const mockStore = configureMockStore();
const characterMock = {
  id: '1',
  name: 'Test Character',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  origin: { name: 'Earth' },
  location: { name: 'Earth' },
  image: 'test_image.jpg',
};

vi.mock('../components/Checkbox/Checkbox', () => ({
  __esModule: true,
  Checkbox: () => <div data-testid="mock-checkbox"></div>,
}));

describe('Card', () => {
  it('renders correctly with dark theme', () => {
    const store = mockStore({
      theme: { theme: { state: ThemeEnum.DARK } },
    });

    const handleClick = vi.fn();
    const { getByText } = render(
      <Provider store={store}>
        <Card character={characterMock} onClick={handleClick} />
      </Provider>
    );

    expect(getByText(characterMock.name)).toBeInTheDocument();
    expect(document.querySelector('.card')).toHaveClass('dark');
  });

  it('does not call onClick when the button is not clicked', () => {
    const store = mockStore({
      theme: { theme: { state: ThemeEnum.LIGHT } },
    });

    const handleClick = vi.fn();
    render(
      <Provider store={store}>
        <Card character={characterMock} onClick={handleClick} />
      </Provider>
    );

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders the character name correctly', () => {
    const store = mockStore({
      theme: { theme: { state: ThemeEnum.LIGHT } },
    });

    const handleClick = vi.fn();
    const { getByText } = render(
      <Provider store={store}>
        <Card character={characterMock} onClick={handleClick} />
      </Provider>
    );

    expect(getByText(characterMock.name)).toBeInTheDocument();
  });

  it('button has correct class based on theme', () => {
    const themes = [ThemeEnum.LIGHT, ThemeEnum.DARK];
    themes.forEach((theme) => {
      const store = mockStore({
        theme: { theme: { state: theme } },
      });

      const handleClick = vi.fn();
      const { container } = render(
        <Provider store={store}>
          <Card character={characterMock} onClick={handleClick} />
        </Provider>
      );

      const button = container.querySelector('.card-button');
      expect(button).toHaveClass(`card-button`);
      expect(container.querySelector('.card')).toHaveClass(
        theme === ThemeEnum.DARK ? 'dark' : 'light'
      );
    });
  });
});
