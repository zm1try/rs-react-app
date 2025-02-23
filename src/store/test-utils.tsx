import { Provider } from 'react-redux';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { render as rtlRender } from '@testing-library/react';
import selectedCharactersReducer from './selectedChatactersReducer';
import savedItemsSlice from './savedItems';
import { swApi } from '../api/swApi';
import React from 'react';

interface RenderWithStoreOptions {
  initialState?: null | object;
  store?: EnhancedStore;
}

export function render(
  ui: React.ReactElement,
  {
    initialState,
    store = configureStore({
      reducer: {
        selectedCharacters: selectedCharactersReducer,
        savedItems: savedItemsSlice.reducer,
        [swApi.reducerPath]: swApi.reducer,
      },
      preloadedState: initialState,
    }),
    ...renderOptions
  }: RenderWithStoreOptions = {}
) {
  function Wrapper({ children }: React.PropsWithChildren<object>) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}
