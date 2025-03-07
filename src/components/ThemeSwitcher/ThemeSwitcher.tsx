import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { toggleTheme } from '@/store/themeToggle';
import { ThemeEnum } from '@/models/Theme.enum';

export function ThemeSwitcher() {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme.state);

  const handleSwitch = () => {
    dispatch(toggleTheme());
  };

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
            onChange={handleSwitch}
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
            onChange={handleSwitch}
          />
        </label>
      </div>
    </>
  );
}
