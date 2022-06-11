import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setSearchInput, setCurrentPage, setCurrentRequest } from '../redux/Slices/SearchSlice';
import './search.scss';
const Search = () => {
  const { searchInput } = useSelector((state) => state.search);
  const { value } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!value) dispatch(setCurrentRequest(''));
  }, []);
  const search = (value) => {
    dispatch(setCurrentPage(1));
    dispatch(setCurrentRequest(value));
    navigate(`/search/${value}/1`);
  };
  return (
    <div>
      <div className="searchBar">
        <form action="" onSubmit={(e) => e.preventDefault()}>
          <div tabIndex="0" className="inputContainer">
            <button
              className="button"
              disabled={searchInput ? false : true}
              onClick={() => search(searchInput)}>
              {'\u{1F50D}'}
            </button>
            <input
              className="input"
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
