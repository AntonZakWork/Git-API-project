import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import image from '../../assets/star.png';
import Popup from '../../Popup/Popup';
import { changeShowPopup } from '../../redux/Slices/SearchSlice';
import styles from './RepoInfo.module.css';
const RepoInfo = () => {
  const { repoData, showPopup } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  return (
    <>
      <div className={styles.profileContainer}>
        <div>
          <img className={styles.avatar} src={repoData.owner.avatar_url} alt="" />
          <div className={styles.returnButton}>
            <Link to="/">
              <button className={styles.backButton}>Back to main</button>
            </Link>
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
              Top-10 contributors
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
    </>
  );
};

export default RepoInfo;
