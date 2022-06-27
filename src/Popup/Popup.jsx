import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContributors } from '../redux/Slices/SearchSlice';
import './popup.scss';
const Popup = ({ contributors_url }) => {
  const { contributorsData } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContributors(contributors_url));
  }, []);
  return (
    <>
      {contributorsData.length ? (
        <div>
          {contributorsData.map((el) => {
            return (
              <span key={el.login} className="popupContainer">
                <img className="avatarThumbnail" src={el.avatar_url} alt="" />
                <a className="popupLink" rel="noreferrer" target="_blank" href={el.html_url}>
                  {el.login}
                </a>
              </span>
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
