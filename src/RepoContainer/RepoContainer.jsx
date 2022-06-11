import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Header/Header';
import Pagination from '../Pagination/Pagination';
import {
  fetchData,
  setCurrentPage,
  setCurrentRequest,
  setPagesArr,
  setRepos,
  setTotalReposCount,
} from '../redux/Slices/SearchSlice';
import RepoCard from '../repoCard/repoCard';
import Spinner from '../Spinner/Spinner';
import './RepoContainer.scss';

const RepoContainer = () => {
  const { isLoading, urlError, serverError, responseTopUsers, responseSearchUsers } = useSelector(
    (state) => state.search,
  );
  const { value, pageNumber } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   useEffect(() => {
  //     debugger;
  //     if (urlError) navigate('/page_not_found');
  //     if (serverError) navigate('/error');
  //   });
  useEffect(() => {
    if (value) {
      dispatch(setCurrentRequest(value));
      dispatch(setCurrentPage(pageNumber));
      dispatch(fetchData({ type: 'responseSearchUsers', value, pageNumber }));
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
    if (responseSearchUsers) {
      dispatch(setTotalReposCount(responseSearchUsers.total_count));
      dispatch(setPagesArr());
      dispatch(setRepos(responseSearchUsers.items));
    }
  }, [responseSearchUsers]);
  return (
    <>
      <Header />
      <div className="table">
        <div className="header">
          <h3>Repo name</h3>
          <h3>Stars count</h3>
          <h3>Updated at:</h3>
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
      {value ? <Pagination /> : ''}
    </>
  );
};

export default RepoContainer;
