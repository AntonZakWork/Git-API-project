import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reset } from '../redux/Slices/SearchSlice';
import './ErrorPage.scss';
const ErrorPage = () => {
  const { serverError } = useSelector((state) => state.search);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <div className="errorContainer">
        {serverError ? <div>{serverError}</div> : <div>'Unknown error!'</div>}
        <div>
          <button
            className="returnButton"
            onClick={() => {
              navigate('/');
              dispatch(reset());
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
      </div>
    </>
  );
};

export default ErrorPage;
