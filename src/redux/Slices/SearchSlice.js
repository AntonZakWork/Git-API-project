import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk(
  'search/fetchData',
  async (payload, { dispatch, getState, rejectWithValue }) => {
    debugger;
    dispatch(setIsLoading(true));

    const baseGit = 'https://api.github.com/';
    switch (payload.type) {
      default: {
        console.log('error');
        break;
      }
      case 'FETCH_USERS':
        {
          let filter = 'in:name';
          if (!payload.pageNumber) {
            payload.pageNumber = 1;
          }
          //   state.search.currentPage = payload.pageNumber;
          if (!payload.value) {
            payload.value = '';
            filter = 'stars%3A%3E0';
          }
          //   state.search.currentRequest = payload.value;
          const response = await fetch(
            `${baseGit}search/repositories?q=${`${payload.value}${filter}`}&sort=stars&order=desc&page=${
              payload.pageNumber
            }&per_page=10`,
            { headers: { Authorization: 'Bearer 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' } },
          );
          debugger;
          const data = await response.json();

          debugger;
          dispatch(setTotalReposCount(data.total_count));
          dispatch(setPagesArr());

          dispatch(setRepos(data.items));
          dispatch(setIsLoading(false));
        }
        break;
      case 'FETCH_REPO': {
        try {
          const response = await fetch(`${baseGit}repos/${payload.author}/${payload.repo}`);
          if (!response.ok) throw new Error('Something crashed :(');
          const data = await response.json();
          dispatch(setRepoData(data));
          dispatch(setIsLoading(false));
        } catch (error) {
          return rejectWithValue(error.message);
        }
      }
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
};

const isInt = (value) => {
  debugger;
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
        debugger;
        state.currentPage = +action.payload;
        state.urlError = '';
      } else {
        debugger;
        // state.currentPage = 1;
        state.urlError = 'Wrong page!';
      }
    },
    setPagesArr(state) {
      debugger;
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
} = searchSlice.actions;
export default searchSlice.reducer;
