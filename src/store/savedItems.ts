import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResultItem } from '../models/ResultItem.model';

const initialState: { characters: ResultItem[] } = {
  characters: [],
};

const savedItemsSlice = createSlice({
  name: 'savedItems',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ResultItem>) => {
      state.characters.push(action.payload);
    },
    removeItemByKey: (state, action: PayloadAction<string>) => {
      state.characters = state.characters.filter(
        (item) => item.url !== action.payload
      );
    },
    removeAllItems: (state) => {
      state.characters = initialState.characters;
    },
  },
});

export default savedItemsSlice;
export const { addItem, removeItemByKey, removeAllItems } =
  savedItemsSlice.actions;
