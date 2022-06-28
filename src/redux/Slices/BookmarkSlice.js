import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookmarks: JSON.parse(localStorage.getItem('bookmarks')) || [],
  bookmarkedIds: JSON.parse(localStorage.getItem('bookmarkedIds')) || [],
  bookmarkCount: +localStorage.getItem('bookmarkCount') || 0,
};

export const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    addBookMark(state, action) {
      const bookmark = {
        name: action.payload.name,
        link: action.payload.full_name,
        ...action.payload.owner,
      };
      if (!state.bookmarks.includes((el) => el.id === action.payload.id)) {
        state.bookmarks.push(bookmark);
        state.bookmarkedIds.push(action.payload.owner.id);
        state.bookmarkCount += 1;
        localStorage.setItem('bookmarkedIds', JSON.stringify(state.bookmarkedIds));
        localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
        localStorage.setItem('bookmarkCount', state.bookmarkCount);
      }
    },
    deleteBookMark(state, action) {
      state.bookmarkCount -= 1;
      state.bookmarkedIds = state.bookmarkedIds.filter((el) => el !== action.payload);
      state.bookmarks = state.bookmarks.filter((el) => el.id !== action.payload);
      localStorage.setItem('bookmarkedIds', JSON.stringify(state.bookmarkedIds));
      localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
      localStorage.setItem('bookmarkCount', state.bookmarkCount);
    },
    setBookmarksFromStorage(state, action) {
      state.bookmarks = action.payload;
    },
    setBookmarksCountFromStorage(state, action) {
      state.bookmarkCount = action.payload;
    },
  },
});

export const { addBookMark, deleteBookMark } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
