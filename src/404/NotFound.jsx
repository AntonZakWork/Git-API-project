import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchData, reset } from '../redux/Slices/SearchSlice';
import styles from './NotFound.module.css';
const NotFound = ({ error }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <div className={styles.notFoundContainer}>
        {error ? <div>{error}</div> : <div>Page not found :(</div>}

        <button
          className={styles.returnButton}
          onClick={() => {
            navigate('/');
            dispatch(reset());
            dispatch(fetchData({ type: 'top_repos' }));
          }}>
          Back to main
        </button>
        <button
          className={styles.returnButton}
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
