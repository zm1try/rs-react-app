import { useTheme } from '../../hooks/useTheme';
import { ThemeEnum } from '../../models/Theme.enum';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <div
        className={`theme-switcher flex-text ${theme === ThemeEnum.DARK ? 'dark' : 'light'}`}
      >
        <label htmlFor="dark">
          dark
          <input
            type="radio"
            id="dark"
            name="dark"
            value={theme}
            checked={theme === ThemeEnum.DARK}
            onChange={toggleTheme}
          />
        </label>
        <label htmlFor="light">
          light
          <input
            type="radio"
            id="light"
            name="light"
            value={theme}
            checked={theme === ThemeEnum.LIGHT}
            onChange={toggleTheme}
          />
        </label>
      </div>
    </>
  );
};
