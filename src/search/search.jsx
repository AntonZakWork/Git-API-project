import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  fetchInitUsers,
  fetchSearchUsers,
  reset,
  setCurrentPage,
  setCurrentRequest,
  setSearchInput,
} from '../redux/Slices/SearchSlice';
import styles from './search.module.css';
const Search = () => {
  const { searchInput, currentRequest } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const search = (value) => {
    dispatch(setCurrentPage(1));
    dispatch(setCurrentRequest(value));
    navigate(`/search/${value}/1`);
    dispatch(fetchSearchUsers({ value }));
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
          className={styles.button}
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
