import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookmarks: [],
  bookmarkedIds: [],
  bookmarkCount: 0,
};

export const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    addBookMark(state, action) {
      state.bookmarks.push(action.payload);
      state.bookmarkedIds.push(action.payload.id);
      state.bookmarkCount += 1;
    },
    deleteBookMark(state, action) {
      state.bookmarkCount -= 1;
      state.bookmarkedIds = state.bookmarkedIds.filter((el) => el !== action.payload);
      state.bookmarks = state.bookmarks.filter((el) => el.id !== action.payload);
    },
  },
});

export const { addBookMark, deleteBookMark } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
