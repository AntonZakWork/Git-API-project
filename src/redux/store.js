import { configureStore } from '@reduxjs/toolkit';
import bookmarkSlice from './Slices/BookmarkSlice';
import searchSlice from './Slices/SearchSlice';

export const store = configureStore({
  reducer: {
    search: searchSlice,
    bookmark: bookmarkSlice,
  },
});
