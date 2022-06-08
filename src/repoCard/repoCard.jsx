import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setIsLoading } from '../redux/Slices/SearchSlice';
import styles from './repoCard.module.css';
import image from '../assets/star.png';

const RepoCard = ({ repos }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        <div className={styles.reposWrapper}>
          {repos.map((el) => (
            <>
              <div
                key={el.url}
                className={styles.container}
                onClick={() => {
                  dispatch(setIsLoading(true));
                  navigate(`/repo/${el.full_name}`);
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
    </div>
  );
};

export default RepoCard;
