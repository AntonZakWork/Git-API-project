import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reset, resetErrors } from '../redux/Slices/SearchSlice';
import './NotFound.scss';
const NotFound = () => {
  useEffect(() => {
    dispatch(resetErrors());
  }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { urlError } = useSelector((state) => state.search);
  return (
    <>
      <div className="notFoundContainer">
        <div>{urlError} Check if link is correct.</div>

        <button
          className="errorButton"
          onClick={() => {
            navigate('/');
            dispatch(reset());
          }}>
          Back to main
        </button>
        <button
          className="errorButton"
          onClick={() => {
            navigate(-1);
          }}>
          Back to previous page
        </button>
      </div>
    </>
  );
};

export default NotFound;
