'use client';
import { useState, ReactNode } from 'react';
import { ThemeEnum } from '../models/Theme.enum';
import { ThemeContext } from '../hooks/useTheme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState(ThemeEnum.DARK);

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === ThemeEnum.DARK ? ThemeEnum.LIGHT : ThemeEnum.DARK
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
