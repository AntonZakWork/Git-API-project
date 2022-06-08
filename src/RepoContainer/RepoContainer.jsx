import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Header/Header';
import Pagination from '../Pagination/Pagination';
import { fetchData, setCurrentPage } from '../redux/Slices/SearchSlice';
import RepoCard from '../repoCard/repoCard';
import Spinner from '../Spinner/Spinner';
import styles from './RepoContainer.module.css';

const RepoContainer = () => {
  const { currentRequest, repos, isLoading, currentPage } = useSelector((state) => state.search);
  const { value, pageNumber } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  debugger;
  useEffect(() => {
    if (value === currentRequest && +pageNumber === currentPage) return;
    if (!value) {
      dispatch(fetchData({ type: 'FETCH_USERS', pageNumber }));
    } else {
      dispatch(fetchData({ type: 'FETCH_USERS', value, pageNumber }));
      pageNumber <= 10 ? dispatch(setCurrentPage(pageNumber)) : navigate('*');
    }
  }, []);

  return (
    <div>
      <Header />
      <div className={styles.header}>
        <h4>Repo name</h4>
        <h4>Stars count</h4>
        <h4>Updated at:</h4>
        <h4>GitHub link</h4>
      </div>
      {isLoading ? (
        <div className={styles.loaderContainer}>
          <Spinner />
        </div>
      ) : (
        <div>
          <RepoCard repos={repos} />
          {value ? <Pagination /> : ''}
        </div>
      )}
    </div>
  );
};

export default RepoContainer;
