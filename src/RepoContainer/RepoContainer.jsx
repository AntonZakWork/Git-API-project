import React, { useCallback, useEffect, useState } from 'react';
import { ReactComponent as Descending } from '../assets/Icons/descending.svg';
import { ReactComponent as Ascending } from '../assets/Icons/ascending.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  fetchData,
  reset,
  setCurrentRequest,
  setIsFetching,
  setPagesArr,
  setRepos,
  setTotalReposCount,
  sortRepos,
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
    activeSort,
  } = useSelector((state) => state.search);
  const [starsAscOrder, setStarsAscOrder] = useState(true);
  const [nameAscOrder, setNameAscOrder] = useState(false);
  const [dateAscOrder, setDateAscOrder] = useState(false);
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
      e.target.documentElement.scrollTop -= 15;
    }
  };
  const { value } = useParams();
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
      dispatch(setCurrentRequest(value));
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

  const onClickFilter = useCallback(({ type }) => {
    dispatch(sortRepos(type));
  }, []);
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
          <h3
            onClick={() => {
              setNameAscOrder((prev) => !prev);
              onClickFilter({ type: 'alphabet' });
            }}>
            Repo name
            <div className={activeSort === 'alphabet' ? 'svgContainer active' : 'svgContainer'}>
              {nameAscOrder ? <Ascending /> : <Descending />}
            </div>
          </h3>
          <h3
            onClick={() => {
              setStarsAscOrder((prev) => !prev);
              onClickFilter({ type: 'stars' });
            }}>
            Stars count
            <div className={activeSort === 'stars' ? 'svgContainer active' : 'svgContainer'}>
              {starsAscOrder ? <Descending /> : <Ascending />}
            </div>
          </h3>
          <h3
            onClick={() => {
              setDateAscOrder((prev) => !prev);
              onClickFilter({ type: 'update' });
            }}
            className="header updated">
            Updated at:
            <div className={activeSort === 'update' ? 'svgContainer active' : 'svgContainer'}>
              {dateAscOrder ? <Descending /> : <Ascending />}
            </div>
          </h3>
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
