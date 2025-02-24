import { createContext, useContext } from 'react';
import { ThemeContextType } from '../models/ThemeContext.model';
import { ThemeEnum } from '../models/Theme.enum';

export const ThemeContext = createContext<ThemeContextType>({
  theme: ThemeEnum.DARK,
  toggleTheme: () => {},
});

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return useContext(ThemeContext);
}
