import { ThemeEnum } from './Theme.enum';

export interface ThemeContextType {
  theme: ThemeEnum;
  toggleTheme: () => void;
}
