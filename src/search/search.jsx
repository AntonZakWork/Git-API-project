import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  reset,
  setCurrentRequest,
  setSearchInput,
  setCurrentPage,
} from '../redux/Slices/SearchSlice';
import styles from './search.module.css';
const Search = () => {
  const { searchInput, currentRequest } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const search = (value) => {
    debugger;
    dispatch(setSearchInput(''));
    dispatch(setCurrentPage(1));
    // dispatch(setCurrentRequest(value));
    navigate(`/search/${value}/1`);
  };
  return (
    <div>
      <div className={styles.searchBar}>
        <input
          className={styles.input}
          onChange={(e) => {
            dispatch(setSearchInput(e.target.value));
          }}
          value={searchInput}
          type="text"
        />
        <button
          className={searchInput ? `${styles.button}` : `${styles.button_disabled}`}
          disabled={searchInput ? false : true}
          onClick={() => search(searchInput)}>
          Search
        </button>
        {currentRequest ? (
          <button
            className={styles.button}
            onClick={() => {
              dispatch(reset());
              navigate(`/`);
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
