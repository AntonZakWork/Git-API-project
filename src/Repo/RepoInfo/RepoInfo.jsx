import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NotFound from '../../404/NotFound';
import image from '../../assets/star.png';
import Popup from '../../Popup/Popup';
import { changeShowPopup, fetchData, reset } from '../../redux/Slices/SearchSlice';
import './RepoInfo.scss';
const RepoInfo = () => {
  const { repoData, showPopup, currentRequest, currentPage, error } = useSelector(
    (state) => state.search,
  );
  useEffect(() => {
    return () => {
      dispatch(changeShowPopup(false));
    };
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      {error ? (
        <NotFound error={error} />
      ) : (
        <div className="profileContainer">
          <div>
            <img className="avatar" src={repoData.owner.avatar_url} alt="" />
            <div className="repoButtons">
              <button
                onClick={() => {
                  navigate('/');
                  dispatch(reset());
                  dispatch(fetchData({ type: 'top_repos' }));
                }}
                className="returnButton">
                Back to main
              </button>
              {currentRequest ? (
                <button
                  onClick={() => {
                    navigate(`/search/${currentRequest}/${currentPage}`);
                    const value = currentRequest;
                    const pageNumber = currentPage;

                    dispatch(fetchData({ type: 'search_repos', value, pageNumber }));
                  }}
                  className="returnButton">
                  Back to search
                </button>
              ) : (
                ''
              )}
            </div>
          </div>

          <div className="infoContainer">
            <div className="repoInfo">
              <b>Repository name:</b> {repoData.name}
            </div>

            <div className="repoInfo">
              <b>Stars count:</b> {repoData.stargazers_count}
              <img className="starRepo" src={image} alt="" />
            </div>

            <div className="repoInfo">
              <b>Date of update:</b> {repoData.updated_at.slice(0, 10)}
            </div>
            <div className="repoInfo">
              <a href={repoData.owner.html_url} rel="noreferrer" target="_blank">
                {repoData.login}Github link
              </a>
            </div>
            <div className="repoInfo">
              <b>Repo language:</b> {repoData.language}
            </div>
            <div className="repoInfo">
              <b>Description:</b> {repoData.description}
            </div>
            <div className="repoInfo">
              <b
                onClick={() => {
                  showPopup ? dispatch(changeShowPopup(false)) : dispatch(changeShowPopup(true));
                }}>
                Top contributors
              </b>
              {showPopup ? (
                <div className="popup">
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
