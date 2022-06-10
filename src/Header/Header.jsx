import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reset } from '../redux/Slices/SearchSlice';
import './Header.scss';
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentRequest } = useSelector((state) => state.search);
  return (
    <div className="headerContainer">
      {currentRequest ? <h2>Search request "{currentRequest}"</h2> : <h2>Top 10 repos</h2>}

      {currentRequest ? (
        <button
          className="button"
          onClick={() => {
            dispatch(reset());
            navigate(`/`);
          }}>
          {'\u{274C}'}
        </button>
      ) : (
        ''
      )}
    </div>
  );
};

export default Header;
