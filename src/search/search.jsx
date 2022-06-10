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
    navigate(`/search/${value}/1`);
  };
  return (
    <div>
      <div className="searchBar">
        <form action="" onSubmit={(e) => e.preventDefault()}>
          <div className="inputContainer">
            <button
              className={searchInput ? `button` : `button_disabled`}
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
