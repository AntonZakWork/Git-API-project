import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchData, reset } from '../redux/Slices/SearchSlice';
import Search from '../Search/Search';
import './Header.scss';
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentRequest } = useSelector((state) => state.search);
  return (
    <div className="headerContainer">
      <div className="headerWrapper">
        {currentRequest ? <h2>Search request "{currentRequest}"</h2> : <h2>Top 10 repos</h2>}
        {currentRequest ? (
          <button
            className="remove"
            onClick={() => {
              dispatch(reset());
              dispatch(fetchData({ type: 'responseTopUsers' }));
            }}>
            {'\u{274C}'}
          </button>
        ) : (
          ''
        )}
      </div>

      <Search />
    </div>
  );
};

export default Header;
