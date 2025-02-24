import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { useTheme } from '../../hooks/useTheme';
import { ThemeEnum } from '../../models/Theme.enum';

jest.mock('../../hooks/useTheme');

describe('ThemeSwitcher Component', () => {
  const mockToggleTheme = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render with dark theme selected', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: ThemeEnum.DARK,
      toggleTheme: mockToggleTheme,
    });

    render(<ThemeSwitcher />);
    const darkRadio = screen.getByLabelText('dark') as HTMLInputElement;
    const lightRadio = screen.getByLabelText('light') as HTMLInputElement;

    expect(darkRadio.checked).toBe(true);
    expect(lightRadio.checked).toBe(false);
  });

  it('should render with light theme selected', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: ThemeEnum.LIGHT,
      toggleTheme: mockToggleTheme,
    });

    render(<ThemeSwitcher />);
    const darkRadio = screen.getByLabelText('dark') as HTMLInputElement;
    const lightRadio = screen.getByLabelText('light') as HTMLInputElement;

    expect(darkRadio.checked).toBe(false);
    expect(lightRadio.checked).toBe(true);
  });

  it('should toggle theme when radio buttons are clicked', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: ThemeEnum.DARK,
      toggleTheme: mockToggleTheme,
    });

    render(<ThemeSwitcher />);
    const lightRadio = screen.getByLabelText('light');

    fireEvent.click(lightRadio);
    expect(mockToggleTheme).toHaveBeenCalled();
  });
});
