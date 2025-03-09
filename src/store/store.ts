import { configureStore } from '@reduxjs/toolkit';
import selectedCharactersReducer from './selectedChatactersReducer';
import savedItemsSlice from './savedItems';
import themeToggle from '@/store/themeToggle';

export const makeStore = () =>
  configureStore({
    reducer: {
      selectedCharacters: selectedCharactersReducer,
      theme: themeToggle.reducer,
      savedItems: savedItemsSlice.reducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];
