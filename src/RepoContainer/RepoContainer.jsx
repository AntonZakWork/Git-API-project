import React from 'react';
import { useSelector } from 'react-redux';
import Pagination from '../Pagination/Pagination';
import RepoCard from '../repoCard/repoCard';
import styles from './RepoContainer.module.css';

const RepoContainer = () => {
  const { currentRequest, repos, isLoading } = useSelector((state) => state.search);
  return (
    <div className={styles.repoContainer}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <RepoCard repos={repos} />
          {currentRequest ? <Pagination /> : ''}
        </div>
      )}
    </div>
  );
};

export default RepoContainer;
