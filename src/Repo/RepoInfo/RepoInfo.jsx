import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import image from '../../assets/star.png';
import Popup from '../../Popup/Popup';
import { changeShowPopup, fetchData } from '../../redux/Slices/SearchSlice';
import Search from '../../Search/Search';
import './RepoInfo.scss';
const RepoInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showPopup, currentRequest, currentPage, responseRepo } = useSelector(
    (state) => state.search,
  );

  return (
    <>
      <Search />

      <div className="profileContainer">
        <div className="avatarContainer">
          <div>
            <img className="avatar" src={responseRepo.owner.avatar_url} alt="" />
            <div className="repoButtons">
              <button
                onClick={() => {
                  navigate('/');
                  dispatch(fetchData({ type: 'responseTopUsers' }));
                }}
                className="returnButton">
                Back to main
              </button>
              {currentRequest ? (
                <button
                  onClick={() => {
                    navigate(`/search/${currentRequest}/${currentPage}`);
                  }}
                  className="returnButton">
                  Back to search
                </button>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>

        <div className="infoContainer">
          <div>
            {' '}
            <div className="repoInfo">
              <a href={responseRepo.html_url} rel="noreferrer" target="_blank">
                <h1>{responseRepo.name}</h1>
              </a>
            </div>
            <div className="description">
              {responseRepo.description ? (
                <i>"{responseRepo.description}"</i>
              ) : (
                <i>No description provided</i>
              )}
            </div>
            <div className="infoBlock">
              <div className="repoInfo">
                <b>Owner: </b>
                <a href={responseRepo.owner.html_url} rel="noreferrer" target="_blank">
                  {responseRepo.owner.login}
                </a>
              </div>

              <div className="repoInfo">
                <b>Stars count:</b> {responseRepo.stargazers_count}
                <img className="starRepo" src={image} alt="" />
              </div>

              <div className="repoInfo">
                <b>Date of update:</b> {responseRepo.updated_at.slice(0, 10)}
              </div>

              <div className="repoInfo">
                {responseRepo.language ? (
                  <div>
                    <b>Repo language:</b>
                    {responseRepo.language}
                  </div>
                ) : (
                  <div>
                    <b>Repo language:</b>
                    <i> Not specified</i>
                  </div>
                )}
              </div>
            </div>
            <div className="repoInfo contributors">
              <b
                onClick={(e) => {
                  debugger;
                  e.stopPropagation();
                  showPopup ? dispatch(changeShowPopup(false)) : dispatch(changeShowPopup(true));
                }}>
                Top contributors
              </b>
              {showPopup ? (
                <div className="popup">
                  <Popup contributors_url={responseRepo.contributors_url} />
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RepoInfo;
