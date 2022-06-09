import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk(
  'search/fetchData',
  async (payload, { dispatch, rejectWithValue }) => {
    dispatch(setIsLoading(true));

    const baseGit = 'https://api.github.com/';
    switch (payload.type) {
      default: {
        console.log('error');
        return;
      }
      case 'FETCH_USERS': {
        let filter = 'in:name';
        if (!payload.pageNumber) {
          payload.pageNumber = 1;
        }
        if (!payload.value) {
          payload.value = '';
          filter = 'stars%3A%3E0';
        }
        const response = await fetch(
          `${baseGit}search/repositories?q=${`${payload.value}${filter}`}&sort=stars&order=desc&page=${
            payload.pageNumber
          }&per_page=10`,
          // { headers: { Authorization: `Token ${process.env.REACT_APP_GIT_API_KEY}` } },
        );

        const data = await response.json();

        dispatch(setTotalReposCount(data.total_count));
        dispatch(setPagesArr());
        dispatch(setRepos(data.items));
        dispatch(setIsLoading(false));
        return;
      }

      case 'FETCH_REPO': {
        try {
          const response = await fetch(`${baseGit}repos/${payload.author}/${payload.repo}`);

          const data = await response.json();
          if (!response.ok || data.message) throw new Error(data?.message || 'Unknown error');

          dispatch(setRepoData(data));
          dispatch(setIsLoading(false));
        } catch (error) {
          console.log(error);
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
  isChangedWithArrows: false,
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
        // state.currentPage = 1;
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
} = searchSlice.actions;
export default searchSlice.reducer;
