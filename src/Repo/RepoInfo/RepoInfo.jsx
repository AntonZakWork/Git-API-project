import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NotFound from '../../404/NotFound';
import image from '../../assets/star.png';
import Popup from '../../Popup/Popup';
import { changeShowPopup } from '../../redux/Slices/SearchSlice';
import styles from './RepoInfo.module.css';
const RepoInfo = () => {
  const { repoData, showPopup, currentRequest, currentPage, error } = useSelector(
    (state) => state.search,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      {error ? (
        <NotFound error={error} />
      ) : (
        <div className={styles.profileContainer}>
          <div>
            <img className={styles.avatar} src={repoData.owner.avatar_url} alt="" />
            <div className={styles.repoButtons}>
              <button onClick={() => navigate('/')} className={styles.button}>
                Back to main
              </button>
              {currentRequest ? (
                <button
                  onClick={() => navigate(`/search/${currentRequest}/${currentPage}`)}
                  className={styles.button}>
                  Back to search
                </button>
              ) : (
                ''
              )}
            </div>
          </div>

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
              <a href={repoData.owner.html_url} rel="noreferrer" target="_blank">
                {repoData.login}Github link
              </a>
            </div>
            <div className={styles.repoInfo}>
              <b>Repo language:</b> {repoData.language}
            </div>
            <div className={styles.repoInfo}>
              <b>Description:</b> {repoData.description}
            </div>
            <div className={styles.repoInfo}>
              <b
                className={styles.contributors}
                onClick={() => {
                  dispatch(changeShowPopup());
                }}>
                Top contributors
              </b>
              {showPopup ? (
                <div className={styles.popup}>
                  <Popup contributors_url={repoData.contributors_url} />
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RepoInfo;
