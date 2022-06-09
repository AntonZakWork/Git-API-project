import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.css';
const NotFound = ({ error }) => {
  const navigate = useNavigate();

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
