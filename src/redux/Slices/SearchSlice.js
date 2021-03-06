import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk(
  'search/fetchData',
  async (payload, { dispatch, rejectWithValue }) => {
    const { type, callback } = payload;
    if (type !== 'responseSearchUsersScroll') {
      dispatch(setIsLoading(true));
    }
    const urlObject = {
      responseTopUsers:
        'https://api.github.com/search/repositories?q=stars%3A%3E0&sort=stars&order=desc&page=1&per_page=10',
      responseSearchUsersFirst: `https://api.github.com/search/repositories?q=${payload.value}in:name&sort=stars&order=desc&page=1&per_page=10`,
      responseRepo: `https://api.github.com/repos/${payload.author}/${payload.repo}`,
      responseSearchUsersScroll: `https://api.github.com/search/repositories?q=${payload.value}in:name&sort=stars&order=desc&page=${payload.currPage}&per_page=10`,
    };
    try {
      const response = await fetch(`${urlObject[type]}`);
      const data = await response.json();
      if (!response.ok || data.message) throw new Error(data?.message || 'Unknown error');
      dispatch(setResponse({ data, type }));
      if (type !== 'responseSearchUsersScroll') {
        dispatch(setIsLoading(false));
      }
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
  responseSearchUsersFirst: null,
  responseSearchUsersScroll: null,
  responseRepo: null,
  isFetching: false,
  activeSort: 'stars',
  ascendingOrder: false,
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
      state.activeSort = 'stars';
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
      if (type === 'responseSearchUsersScroll') {
        state.responseSearchUsersFirst.items = [
          ...state.responseSearchUsersFirst.items,
          ...data.items,
        ];
        state.isFetching = false;
      }
      state[type] = data;
    },
    setIsFetching(state, action) {
      state.isFetching = action.payload;
    },
    sortRepos(state, action) {
      if (action.payload !== state.activeSort) {
        state.ascendingOrder = false;
      }
      switch (action.payload) {
        default:
          return state;
        case 'alphabet': {
          if (!state.ascendingOrder) {
            state.repos.sort((a, b) => a.name.localeCompare(b.name));
            state.ascendingOrder = true;
          } else state.repos.reverse();
          state.activeSort = action.payload;
          return;
        }
        case 'stars': {
          if (!state.ascendingOrder) {
            if (!state.activeSort) {
              state.repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
            }
            state.repos.sort((a, b) => a.stargazers_count - b.stargazers_count);
            state.ascendingOrder = true;
          } else state.repos.reverse();
          state.activeSort = action.payload;
          return;
        }
        case 'update': {
          if (!state.ascendingOrder) {
            state.repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
            state.ascendingOrder = true;
          } else state.repos.reverse();
          state.activeSort = action.payload;
          return;
        }
      }
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
  setIsFetching,
  sortRepos,
} = searchSlice.actions;
export default searchSlice.reducer;
