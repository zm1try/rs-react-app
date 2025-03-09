import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { ThemeEnum } from '@/models/Theme.enum';
import { useTheme } from '@/hooks/useTheme.tsx';
import { ThemeSwitcher } from '@/components/ThemeSwitcher/ThemeSwitcher.tsx';

vi.mock('@/hooks/useTheme.tsx', () => ({
  useTheme: vi.fn(),
}));

describe('ThemeSwitcher', () => {
  let mockToggleTheme: vi.Mock;

  beforeEach(() => {
    mockToggleTheme = vi.fn();
    (useTheme as vi.Mock).mockReturnValue({
      theme: ThemeEnum.LIGHT,
      toggleTheme: mockToggleTheme,
    });
  });

  it('renders the radio buttons for dark and light themes', () => {
    const { getByLabelText } = render(<ThemeSwitcher />);

    expect(getByLabelText('dark')).toBeInTheDocument();
    expect(getByLabelText('light')).toBeInTheDocument();
  });

  it('checks the correct radio button based on the current theme', () => {
    const { getByLabelText } = render(<ThemeSwitcher />);

    const darkRadio = getByLabelText('dark') as HTMLInputElement;
    const lightRadio = getByLabelText('light') as HTMLInputElement;

    expect(darkRadio.checked).toBe(false);
    expect(lightRadio.checked).toBe(true);
  });

  it('calls toggleTheme when a radio button is clicked', () => {
    const { getByLabelText } = render(<ThemeSwitcher />);

    const darkRadio = getByLabelText('dark');
    fireEvent.click(darkRadio);

    expect(mockToggleTheme).toHaveBeenCalled();
  });

  it('applies the correct theme class based on the current theme', () => {
    const { container } = render(<ThemeSwitcher />);

    const themeSwitcher = container.querySelector('.theme-switcher');
    expect(themeSwitcher).toHaveClass('light');
  });

  it('updates the theme class when the theme changes', () => {
    (useTheme as vi.Mock).mockReturnValueOnce({
      theme: ThemeEnum.DARK,
      toggleTheme: mockToggleTheme,
    });

    const { container } = render(<ThemeSwitcher />);

    const themeSwitcher = container.querySelector('.theme-switcher');
    expect(themeSwitcher).toHaveClass('dark');
  });
});
