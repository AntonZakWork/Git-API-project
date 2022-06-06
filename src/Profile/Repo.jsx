import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRepo, setIsLoading, setRepoData } from '../redux/Slices/SearchSlice';
import { Link, useParams } from 'react-router-dom';
import styles from './Repo.module.css';
import image from '../assets/star.png';

const Repo = () => {
  const { isLoading, repoData, currentRequest } = useSelector((state) => state.search);
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
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className={styles.profileContainer}>
            <img className={styles.avatar} src={repoData.owner.avatar_url} alt="" />
            <div className={styles.infoContainer}>
              <div className={styles.repoInfo}>
                <b>Repository name:</b> {repoData.name}
              </div>

              <div className={styles.repoInfo}>
                {' '}
                <b>Stars count:</b> {repoData.stargazers_count}
                <img className={styles.star} src={image} alt="" />
              </div>

              <div className={styles.repoInfo}>
                <b>Date of update:</b> {repoData.updated_at.slice(0, 10)}
              </div>
              <div className={styles.repoInfo}>
                <a href={repoData.owner.url}>{repoData.login}Github link</a>
              </div>
              <div className={styles.repoInfo}>
                <b>Repo language:</b> {repoData.language}
              </div>
              <div className={styles.repoInfo}>
                <b>Description:</b> {repoData.description}
              </div>
              <div className={styles.returnButton}>
                <Link to="/">
                  <button>Back to main</button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Repo;
