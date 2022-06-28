import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk(
  'search/fetchData',
  async (payload, { dispatch, rejectWithValue }) => {
    dispatch(setIsLoading(true));
    const { type, callback } = payload;
    const urlObject = {
      responseTopUsers:
        'https://api.github.com/search/repositories?q=stars%3A%3E0&sort=stars&order=desc&page=1&per_page=10',
      responseSearchUsers: `https://api.github.com/search/repositories?q=${payload.value}in:name&sort=stars&order=desc&page=${payload.pageNumber}&per_page=10`,
      responseRepo: `https://api.github.com/repos/${payload.author}/${payload.repo}`,
    };
    try {
      const response = await fetch(`${urlObject[type]}`);
      const data = await response.json();
      if (!response.ok || data.message) throw new Error(data?.message || 'Unknown error');
      dispatch(setResponse({ data, type }));
      dispatch(setIsLoading(false));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchContributors = createAsyncThunk(
  'search/Contributors',
  async (contributorsLink, { dispatch }) => {
    const response = await fetch(`${contributorsLink}?page=1&per_page=5`);
    const data = await response.json();
    dispatch(setContributorsData(data));
  },
);

const initialState = {
  searchInput: '',
  currentRequest: '',
  repos: [],
  totalReposCount: '',
  currentPage: 1,
  pagesArr: [],
  isLoading: true,
  repoData: [],
  currentProfileName: '',
  showPopup: false,
  contributorsData: [],
  urlError: null,
  serverError: null,
  theme: 'light',
  responseTopUsers: null,
  responseSearchUsers: null,
  responseRepo: null,
};

const isInt = (value) => {
  return (
    !isNaN(value) &&
    parseInt(Number(value)) == value &&
    !isNaN(parseInt(value, 10)) &&
    +value > 0 &&
    +value < 11
  );
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    reset(state) {
      state.searchInput = '';
      state.currentPage = 1;
      state.currentRequest = '';
      state.serverError = '';
      state.urlError = '';
      state.responseTopUsers = null;
      state.responseSearchUsers = null;
      state.responseRepo = null;
    },
    resetErrors(state) {
      state.serverError = null;
      state.urlError = null;
    },
    setSearchInput(state, action) {
      state.searchInput = action.payload;
    },
    setCurrentRequest(state, action) {
      action.payload
        ? (state.currentRequest = action.payload)
        : (state.currentRequest = state.searchInput);
    },
    setRepos(state, action) {
      state.repos = action.payload;
    },
    setTotalReposCount(state, action) {
      state.totalReposCount = action.payload;
    },
    setCurrentPage(state, action) {
      if (isInt(action.payload)) {
        state.currentPage = +action.payload;
        state.urlError = '';
      } else {
        state.urlError = 'Wrong page!';
      }
    },
    setPagesArr(state) {
      state.pagesArr = [];
      if (state.totalReposCount > 100) state.totalReposCount = 100;
      for (let i = 1; i <= Math.ceil(state.totalReposCount / 10); i++) {
        state.pagesArr.push(i);
      }
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    changeCurrPageArrow(state, action) {
      state.currentPage = state.currentPage + action.payload;
    },
    changeShowPopup(state, action) {
      state.showPopup = action.payload;
    },
    setContributorsData(state, action) {
      state.contributorsData = action.payload;
    },
    setTheme(state, action) {
      state.theme = action.payload;
      localStorage.setItem('theme', state.theme);
    },
    setResponse(state, action) {
      const {
        payload: { type, data },
      } = action;
      state[type] = data;
    },
  },
  extraReducers: {
    [fetchData.pending]: (state) => {
      state.error = '';
    },
    [fetchData.fulfilled]: (state) => {},
    [fetchData.rejected]: (state, action) => {
      state.isLoading = false;
      state.serverError = action.payload;
    },
  },
});

export const {
  reset,
  setSearchInput,
  setCurrentRequest,
  setRepos,
  setTotalReposCount,
  setCurrentPage,
  setPagesArr,
  setIsLoading,
  setCurrentProfileName,
  changeCurrPageArrow,
  changeShowPopup,
  setContributorsData,
  setTheme,
  setResponse,
  resetErrors,
} = searchSlice.actions;
export default searchSlice.reducer;
