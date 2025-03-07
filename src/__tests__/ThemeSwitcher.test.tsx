import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { useDispatch } from 'react-redux';
import { toggleTheme } from '@/store/themeToggle';
import { ThemeEnum } from '@/models/Theme.enum';
import { ThemeSwitcher } from '@/components/ThemeSwitcher/ThemeSwitcher.tsx';

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  return {
    ...actual,
    useDispatch: vi.fn(),
  };
});

const mockStore = configureMockStore();

describe('ThemeSwitcher', () => {
  let mockDispatch: vi.Mock;

  beforeEach(() => {
    mockDispatch = vi.fn();
    (useDispatch as vi.Mock).mockReturnValue(mockDispatch);
  });

  it('renders the radio buttons for dark and light themes', () => {
    const store = mockStore({
      theme: { theme: { state: ThemeEnum.LIGHT } },
    });

    const { getByLabelText } = render(
      <Provider store={store}>
        <ThemeSwitcher />
      </Provider>
    );

    expect(getByLabelText('dark')).toBeInTheDocument();
    expect(getByLabelText('light')).toBeInTheDocument();
  });

  it('checks the correct radio button based on the current theme', () => {
    const store = mockStore({
      theme: { theme: { state: ThemeEnum.DARK } },
    });

    const { getByLabelText } = render(
      <Provider store={store}>
        <ThemeSwitcher />
      </Provider>
    );

    const darkRadio = getByLabelText('dark') as HTMLInputElement;
    const lightRadio = getByLabelText('light') as HTMLInputElement;

    expect(darkRadio.checked).toBe(true);
    expect(lightRadio.checked).toBe(false);
  });

  it('dispatches toggleTheme when a radio button is clicked', () => {
    const store = mockStore({
      theme: { theme: { state: ThemeEnum.LIGHT } },
    });

    const { getByLabelText } = render(
      <Provider store={store}>
        <ThemeSwitcher />
      </Provider>
    );

    const darkRadio = getByLabelText('dark');
    fireEvent.click(darkRadio);

    expect(mockDispatch).toHaveBeenCalledWith(toggleTheme());
  });

  it('applies the correct theme class based on the current theme', () => {
    const store = mockStore({
      theme: { theme: { state: ThemeEnum.DARK } },
    });

    const { container } = render(
      <Provider store={store}>
        <ThemeSwitcher />
      </Provider>
    );

    const themeSwitcher = container.querySelector('.theme-switcher');
    expect(themeSwitcher).toHaveClass('dark');
  });
});
