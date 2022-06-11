import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk(
  'search/fetchData',
  async (payload, { dispatch, rejectWithValue }) => {
    dispatch(setIsLoading(true));
    const { type } = payload;
    const urlObject = {
      top_repos:
        'https://api.github.com/search/repositories?q=stars%3A%3E0&sort=stars&order=desc&page=1&per_page=10',
      search_repos: `https://api.github.com/search/repositories?q=${payload.value}in:name&sort=stars&order=desc&page=${payload.pageNumber}&per_page=10`,
      repo: `https://api.github.com/repos/${payload.author}/${payload.repo}`,
    };
    try {
      const response = await fetch(`${urlObject[type]}`);
      const data = await response.json();
      if (!response.ok || data.message) throw new Error(data?.message || 'Unknown error');
      dispatch(setTotalReposCount(data.total_count));
      dispatch(setPagesArr());
      dispatch(setRepos(data.items));
      dispatch(setRepoData(data));
      dispatch(setIsLoading(false));
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  },
);

export const fetchContributors = createAsyncThunk(
  'search/Contributors',
  async (contributorsLink, { dispatch }) => {
    const response = await fetch(`${contributorsLink}?page=1&per_page=10`);
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
  urlError: '',
  error: '',
  isChangedWithArrows: false,
  theme: 'dark',
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
      state.error = '';
      state.urlError = '';
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
    setRepoData(state, action) {
      state.repoData = action.payload;
    },
    changeCurrPageArrow(state, action) {
      state.currentPage = state.currentPage + action.payload;
    },
    changeShowPopup(state) {
      state.showPopup = !state.showPopup;
    },
    setContributorsData(state, action) {
      state.contributorsData = action.payload;
    },
    setIsChangedWithArrows(state, action) {
      state.isChangedWithArrows = action.payload;
    },
    toggleTheme(state) {
      state.theme === 'light' ? (state.theme = 'dark') : (state.theme = 'light');
      localStorage.setItem('storedTheme', state.theme);
    },
  },
  extraReducers: {
    [fetchData.pending]: (state) => {
      state.error = '';
    },
    [fetchData.fulfilled]: (state) => {},
    [fetchData.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
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
  setRepoData,
  setCurrentProfileName,
  changeCurrPageArrow,
  changeShowPopup,
  setContributorsData,
  setIsChangedWithArrows,
  toggleTheme,
} = searchSlice.actions;
export default searchSlice.reducer;
