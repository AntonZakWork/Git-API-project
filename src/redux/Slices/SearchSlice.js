import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk(
  'search/fetchData',
  async (payload, { dispatch, getState }) => {
    dispatch(setIsLoading(true));
    const state = getState();
    const baseGit = 'https://api.github.com/';
    switch (payload.type) {
      default: {
        console.log('error');
        break;
      }
      case 'FETCH_USERS':
        {
          let filter = 'in:name';
          if (!payload.pageNumber) payload.pageNumber = 1;
          if (!payload.value) {
            payload.value = '';
            filter = 'stars%3A%3E0';
          }
          const response = await fetch(
            `${baseGit}search/repositories?q=${`${payload.value}${filter}`}&sort=stars&order=desc&page=${
              payload.pageNumber
            }&per_page=10`,
          );
          const data = await response.json();
          dispatch(setRepos(data.items));
          dispatch(setIsLoading(false));
          if (state.search.pagesArr.length === 0) {
            dispatch(setTotalReposCount(data.total_count));
            dispatch(setPagesArr());
          }
        }
        break;
      case 'FETCH_REPO': {
        const response = await fetch(`${baseGit}repos/${payload.author}/${payload.repo}`);
        const data = await response.json();
        dispatch(setRepoData(data));
        dispatch(setIsLoading(false));
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
  currentProfileURL: '',
  repoData: [],
  currentProfileName: '',
  showPopup: false,
  contributorsData: [],
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
      state.currentPage = +action.payload;
    },
    setPagesArr(state) {
      if (state.totalReposCount > 100) state.totalReposCount = 100;
      for (let i = 1; i <= Math.ceil(state.totalReposCount / 10); i++) {
        state.pagesArr.push(i);
      }
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setCurrentProfileURL(state, action) {
      state.currentProfileURL = action.payload;
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
});

export const {
  reset,
  setSearchInput,
  setCurrentRequest,
  setRepos,
  setTotalReposCount,
  setCurrentPage,
  setPagesArr,
  setCurrentProfileURL,
  setIsLoading,
  setRepoData,
  setCurrentProfileName,
  changeCurrPageArrow,
  changeShowPopup,
  setContributorsData,
} = searchSlice.actions;
export default searchSlice.reducer;
