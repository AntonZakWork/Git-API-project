import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Header/Header';
import Pagination from '../Pagination/Pagination';
import { fetchData, setCurrentPage, setCurrentRequest } from '../redux/Slices/SearchSlice';
import RepoCard from '../repoCard/repoCard';
import Spinner from '../Spinner/Spinner';
import './RepoContainer.scss';

const RepoContainer = () => {
  const { repos, isLoading, urlError, error } = useSelector((state) => state.search);
  const { value, pageNumber } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (urlError || error) {
      navigate('/page_not_found');
    }
  });
  useEffect(() => {
    if (value) {
      dispatch(setCurrentRequest(value));
      dispatch(setCurrentPage(pageNumber));
      dispatch(fetchData({ type: 'search_repos', value, pageNumber }));
    } else {
      dispatch(fetchData({ type: 'top_repos' }));
    }
  }, []);

  return (
    <div>
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
            <RepoCard repos={repos} />
          </div>
        )}
      </div>
      {value ? <Pagination /> : ''}
    </div>
  );
};

export default RepoContainer;
