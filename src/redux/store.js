import { configureStore } from '@reduxjs/toolkit';
import searchSlice from './Slices/SearchSlice';

export const store = configureStore({
  reducer: {
    search: searchSlice,
  },
});
