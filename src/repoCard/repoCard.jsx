import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCurrentProfileURL, setIsLoading } from '../redux/Slices/SearchSlice';
import styles from './repoCard.module.css';
import image from '../assets/star.png';

const RepoCard = ({ repos }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        <div className={styles.header}>
          <h4>Repo name</h4>
          <h4>Stars count</h4>
          <h4>Updated at:</h4>
          <h4>GitHub link</h4>
        </div>
        {repos.map((el) => (
          <>
            <div
              className={styles.container}
              onClick={() => {
                dispatch(setCurrentProfileURL(el.url));
                dispatch(setIsLoading(true));
              }}>
              <Link className={styles.linkedProp} to={el.name}>
                <div className={styles.prop} key={el.id}>
                  {el.name}
                </div>
              </Link>

              <div className={styles.prop} key={el.stargazers_count}>
                <img className={styles.star} src={image} alt="" />
                {el.stargazers_count}
              </div>
              <div className={styles.prop} key={el.updated_at}>
                {el.updated_at.toString().slice(0, 10)}
              </div>
              <div className={styles.Prop} key={el.svn_url}>
                <a className={styles.linkedProp} href={el.svn_url}>
                  Open with GitHub
                </a>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default RepoCard;
