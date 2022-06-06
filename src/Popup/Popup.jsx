import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContributors } from '../redux/Slices/SearchSlice';
import styles from './popup.module.css';
const Popup = ({ contributors_url }) => {
  const { contributorsData } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContributors(contributors_url));
  }, []);
  console.log(contributorsData);
  return (
    <>
      {contributorsData.length ? (
        <div>
          {contributorsData.map((el) => {
            return (
              <div className={styles.container}>
                <img className={styles.avatarThumbnail} src={el.avatar_url} alt="" />
                <a className={styles.popupLink} rel="noreferrer" target="_blank" href={el.html_url}>
                  {el.login}
                </a>
              </div>
            );
          })}
        </div>
      ) : (
        'Loading...'
      )}
    </>
  );
};

export default Popup;
