import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  setSearchInput,
  setCurrentPage,
  setCurrentRequest,
  fetchData,
  reset,
} from '../redux/Slices/SearchSlice';
import './search.scss';
import { ReactComponent as BookmarkSVG } from '../assets/bookmarks/Bookmark.svg';
import { ReactComponent as HomePage } from '../assets/Icons/homepage.svg';
const Search = () => {
  const location = useLocation();
  const { searchInput } = useSelector((state) => state.search);
  const { bookmarkCount } = useSelector((state) => state.bookmark);
  const { value } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchRef = useRef();
  useEffect(() => {
    if (!value) dispatch(setCurrentRequest(''));
  }, []);
  const search = (value) => {
    if (value) {
      dispatch(setCurrentPage(1));
      dispatch(setCurrentRequest(value));
      dispatch(fetchData({ type: 'responseSearchUsersFirst', value }));
      navigate(`/search/${value}/1`);
    } else {
      searchRef.current.placeholder = 'Type your request!';
    }
  };
  return (
    <div>
      <div className="searchBar">
        {location.pathname === '/' ? (
          ''
        ) : (
          <div
            onClick={(e) => {
              e.stopPropagation();
              dispatch(reset());
              navigate('/');
              dispatch(fetchData({ type: 'responseTopUsers' }));
            }}
            className="homePage">
            <HomePage />
          </div>
        )}

        <div
          onClick={(e) => {
            e.stopPropagation();
            navigate('/bookmarks');
          }}
          className="bookmark">
          <div className="counter">{bookmarkCount}</div>
          <BookmarkSVG />
        </div>

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
