import { createSlice } from '@reduxjs/toolkit';
import { ThemeEnum } from '@/models/Theme.enum';

const themeToggle = createSlice({
  name: 'theme',
  initialState: {
    theme: {
      state: ThemeEnum.DARK,
    },
  },
  reducers: {
    toggleTheme: (state) => {
      state.theme.state =
        state.theme.state === ThemeEnum.DARK ? ThemeEnum.LIGHT : ThemeEnum.DARK;
    },
  },
});

export const { toggleTheme } = themeToggle.actions;
export default themeToggle;
