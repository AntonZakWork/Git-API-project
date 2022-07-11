import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import {
  fetchData,
  reset,
  setCurrentPage,
  setCurrentRequest,
  setIsFetching,
  setPagesArr,
  setRepos,
  setTotalReposCount,
} from '../redux/Slices/SearchSlice';
import RepoCard from '../repoCard/repoCard';
import SmallLoading from '../SmallLoading/SmallLoading';
import Spinner from '../Spinner/Spinner';
import './RepoContainer.scss';

const RepoContainer = () => {
  const {
    currentRequest,
    isLoading,
    responseTopUsers,
    responseSearchUsersFirst,
    urlError,
    serverError,
    isFetching,
  } = useSelector((state) => state.search);
  const [currPage, setcurrPage] = useState(2);
  useEffect(() => {
    if (isFetching) {
      dispatch(fetchData({ type: 'responseSearchUsersScroll', value, currPage }));
      setcurrPage((prev) => prev + 1);
    }
  }, [isFetching]);
  const scrollHandler = (e) => {
    if (
      !isFetching &&
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        30
    ) {
      dispatch(setIsFetching(true));
    }
  };
  const { value, pageNumber } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (urlError) navigate('/page_not_found');
    if (serverError) navigate('/error');
  }, [urlError, serverError]);

  useEffect(() => {
    if (value) {
      document.addEventListener('scroll', scrollHandler);
    }

    return () => document.removeEventListener('scroll', scrollHandler);
  }, [value]);
  useEffect(() => {
    if (value) {
      //   document.addEventListener('scroll', scrollHandler);
      dispatch(setCurrentRequest(value));
      dispatch(setCurrentPage(pageNumber));
      dispatch(fetchData({ type: 'responseSearchUsersFirst', value }));
    } else {
      dispatch(fetchData({ type: 'responseTopUsers' }));
    }
  }, []);
  useEffect(() => {
    if (responseTopUsers) {
      dispatch(setTotalReposCount(responseTopUsers.total_count));
      dispatch(setPagesArr());
      dispatch(setRepos(responseTopUsers.items));
    }
  }, [responseTopUsers]);

  useEffect(() => {
    if (responseSearchUsersFirst) {
      dispatch(setTotalReposCount(responseSearchUsersFirst.total_count));
      dispatch(setPagesArr());
      dispatch(setRepos(responseSearchUsersFirst.items));
    }
  }, [responseSearchUsersFirst]);
  return (
    <>
      <div className="headerWrapper">
        {currentRequest ? <h2>Search request "{currentRequest}"</h2> : <h2>Top 10 repos</h2>}
        {currentRequest ? (
          <button
            className="remove"
            onClick={() => {
              dispatch(reset());
              navigate('/');
              dispatch(fetchData({ type: 'responseTopUsers' }));
            }}>
            {'\u{274C}'}
          </button>
        ) : (
          ''
        )}
      </div>
      <div className="table">
        <div className="header">
          <h3>Repo name</h3>
          <h3>Stars count</h3>
          <h3 className="header updated">Updated at:</h3>
          <h3>GitHub link</h3>
        </div>
        {isLoading ? (
          <div className="loaderContainer">
            <Spinner />
          </div>
        ) : (
          <div className="cardsWrapper">
            <RepoCard />
          </div>
        )}
      </div>
      {/* {value ? <Pagination /> : ''} */}
      {isFetching && <SmallLoading />}
    </>
  );
};

export default RepoContainer;
