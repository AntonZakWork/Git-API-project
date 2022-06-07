import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.css';
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>Page not found :(</div>
      <button
        className={styles.returnButton}
        onClick={() => {
          navigate(`/`);
        }}>
        Back to main
      </button>
    </>
  );
};

export default NotFound;
