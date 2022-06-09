import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.css';
const NotFound = ({ error }) => {
  const { currentPage, currentRequest } = useSelector((state) => state.search);
  debugger;
  const navigate = useNavigate();
  //   useEffect(() => {
  //     navigate('/page_not_found');
  //   }, []);
  return (
    <>
      <div className={styles.notFoundContainer}>
        {error ? <div>{error}</div> : <div>Page not found :(</div>}

        <button
          className={styles.returnButton}
          onClick={() => {
            navigate(`/`);
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
