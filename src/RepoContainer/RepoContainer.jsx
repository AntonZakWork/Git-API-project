import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import Pagination from '../Pagination/Pagination';
import {
  fetchInitUsers,
  fetchSearchUsers,
  setCurrentPage,
  setCurrentRequest,
} from '../redux/Slices/SearchSlice';
import RepoCard from '../repoCard/repoCard';
import styles from './RepoContainer.module.css';

const RepoContainer = () => {
  const { currentRequest, repos, isLoading, currentPage } = useSelector((state) => state.search);
  const { value, pageNumber } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    debugger;
    if (value === currentRequest && +pageNumber === currentPage) return;
    if (!value) {
      dispatch(fetchInitUsers());
    } else {
      dispatch(fetchSearchUsers({ value, pageNumber }));
      dispatch(setCurrentRequest(value));
      pageNumber <= 10 ? dispatch(setCurrentPage(pageNumber)) : dispatch(setCurrentPage(1));
    }
  }, []);

  return (
    <div className={styles.repoContainer}>
      <Header />
      {isLoading ? (
        <div>Loading...</div>
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
