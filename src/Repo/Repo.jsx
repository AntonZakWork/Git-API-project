import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRepo, setIsLoading, setRepoData } from '../redux/Slices/SearchSlice';
import { useParams } from 'react-router-dom';
import styles from './Repo.module.css';

import RepoInfo from './RepoInfo/RepoInfo';

const Repo = () => {
  const { isLoading, repoData } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const repoName = useParams();

  useEffect(() => {
    const storedRepoData = JSON.parse(localStorage.getItem('repoData'));
    if (storedRepoData !== null && storedRepoData.name === repoName.name) {
      dispatch(setRepoData(storedRepoData));
      dispatch(setIsLoading(false));
    } else dispatch(fetchRepo());
  }, []);

  useEffect(() => {
    localStorage.setItem('repoData', JSON.stringify(repoData));
  }, [repoData]);
  return (
    <>
      <div className={styles.profileWrapper}>
        {isLoading ? <div>Loading...</div> : <RepoInfo />}
      </div>
    </>
  );
};

export default Repo;
