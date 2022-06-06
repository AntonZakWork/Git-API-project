import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchInitUsers,
  fetchSearchUsers,
  setCurrentPage,
  setCurrentRequest,
  setSearchInput,
} from '../redux/Slices/SearchSlice';
import styles from './search.module.css';
const Search = () => {
  const { searchInput, currentRequest } = useSelector((state) => state.search);
  const dispatch = useDispatch();

  const search = (payload) => {
    if (!payload) {
      dispatch(fetchInitUsers());
    } else {
      dispatch(setCurrentPage(1));
      dispatch(setCurrentRequest(payload));
      dispatch(fetchSearchUsers());
    }
  };
  return (
    <div>
      <div className={styles.searchBar}>
        <input
          className={styles.input}
          onChange={(e) => dispatch(setSearchInput(e.target.value))}
          value={searchInput}
          type="text"
        />
        <button className={styles.button} onClick={() => search(searchInput)}>
          Search
        </button>
        {currentRequest ? (
          <button
            className={styles.button}
            onClick={() => {
              dispatch(fetchInitUsers());
              dispatch(setSearchInput(''));
              dispatch(setCurrentRequest());
              dispatch(setCurrentPage(1));
            }}>
            Clear
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Search;
