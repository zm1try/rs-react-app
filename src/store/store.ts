import { configureStore } from '@reduxjs/toolkit';
import selectedCharactersReducer from './selectedChatactersReducer';
import savedItemsSlice from './savedItems';
import { createWrapper } from 'next-redux-wrapper';
import { swApi } from '@/store/api/swApi';
import themeToggle from '@/store/themeToggle';

export const makeStore = () =>
  configureStore({
    reducer: {
      selectedCharacters: selectedCharactersReducer,
      theme: themeToggle.reducer,
      savedItems: savedItemsSlice.reducer,
      [swApi.reducerPath]: swApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(swApi.middleware);
    },
  });

export const wrapper = createWrapper(makeStore, { debug: false });

export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];
