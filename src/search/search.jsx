import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  setSearchInput,
  setCurrentPage,
  setCurrentRequest,
  fetchData,
} from '../redux/Slices/SearchSlice';
import './search.scss';
const Search = () => {
  const { searchInput } = useSelector((state) => state.search);
  const { value } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchRef = useRef();
  useEffect(() => {
    if (!value) dispatch(setCurrentRequest(''));
  }, []);
  const search = (value) => {
    console.log('inside search');
    if (value) {
      dispatch(setCurrentPage(1));
      dispatch(setCurrentRequest(value));
      const pageNumber = 1;
      dispatch(fetchData({ type: 'responseSearchUsers', value, pageNumber }));
      navigate(`/search/${value}/1`);
    } else {
      searchRef.current.placeholder = 'Type your request!';
    }
  };
  return (
    <div>
      <div className="searchBar">
        <form action="" onSubmit={(e) => e.preventDefault()}>
          <div className="inputContainer">
            <button className="button" onClick={() => search(searchInput)}>
              {'\u{1F50D}'}
            </button>
            <input
              ref={searchRef}
              className="input"
              onFocus={() => (searchRef.current.placeholder = '')}
              onChange={(e) => {
                dispatch(setSearchInput(e.target.value));
              }}
              value={searchInput}
              type="text"
            />
            {searchInput ? (
              <button
                className="button"
                onClick={() => {
                  searchRef.current.focus();
                  dispatch(setSearchInput(''));
                }}>
                {'\u{274C}'}
              </button>
            ) : (
              ''
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Search;
