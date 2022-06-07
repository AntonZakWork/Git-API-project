import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reset, setCurrentProfileURL, setIsLoading } from '../redux/Slices/SearchSlice';
import styles from './repoCard.module.css';
import image from '../assets/star.png';

const RepoCard = ({ repos }) => {
  const navigate = useNavigate();
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
              key={el.url}
              className={styles.container}
              onClick={() => {
                dispatch(reset());
                dispatch(setCurrentProfileURL(el.url));
                dispatch(setIsLoading(true));
                navigate(`/repo/${el.name}`);
              }}>
              <div className={styles.linkedProp} key={el.id}>
                {el.name}
              </div>

              <div className={styles.prop} key={el.stargazers_count}>
                <img className={styles.star} src={image} alt="" />
                {el.stargazers_count}
              </div>
              <div className={styles.prop} key={el.updated_at}>
                {el.updated_at.toString().slice(0, 10)}
              </div>
              <div className={styles.linkedProp} key={el.svn_url}>
                <a href={el.svn_url}>Open with GitHub</a>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default RepoCard;
