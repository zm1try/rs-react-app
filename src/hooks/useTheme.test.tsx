import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { ThemeContext, useTheme } from './useTheme';
import { ThemeEnum } from '../models/Theme.enum';

const ThemeButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>{theme}</button>;
};

describe('ThemeButton', () => {
  it('should display the current theme and toggle on click', () => {
    const toggleTheme = jest.fn();
    render(
      <ThemeContext.Provider value={{ theme: ThemeEnum.DARK, toggleTheme }}>
        <ThemeButton />
      </ThemeContext.Provider>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(toggleTheme).toHaveBeenCalledTimes(1);
  });
});
