import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchData, reset } from '../redux/Slices/SearchSlice';
import './NotFound.scss';
const NotFound = ({ error }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <div className="notFoundContainer">
        {error ? <div>{error}</div> : <div>Page not found :(</div>}

        <button
          className="returnButton"
          onClick={() => {
            navigate('/');
            dispatch(reset());
            dispatch(fetchData({ type: 'top_repos' }));
          }}>
          Back to main
        </button>
        <button
          className="returnButton"
          onClick={() => {
            navigate(-2);
          }}>
          Back to previous page
        </button>
      </div>
    </>
  );
};

export default NotFound;
