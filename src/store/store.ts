import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import selectedCharactersReducer from './selectedChatactersReducer';
import { swApi } from '../api/swApi';
import savedItemsSlice from './savedItems';

export const store = configureStore({
  reducer: {
    selectedCharacters: selectedCharactersReducer,
    savedItems: savedItemsSlice.reducer,
    [swApi.reducerPath]: swApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(swApi.middleware);
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
