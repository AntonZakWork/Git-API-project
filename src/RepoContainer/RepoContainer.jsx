import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Header/Header';
import Pagination from '../Pagination/Pagination';
import {
  fetchData,
  reset,
  setCurrentPage,
  setCurrentRequest,
  setIsChangedWithArrows,
} from '../redux/Slices/SearchSlice';
import RepoCard from '../repoCard/repoCard';
import Spinner from '../Spinner/Spinner';
import styles from './RepoContainer.module.css';

const RepoContainer = () => {
  const { currentRequest, repos, isLoading, currentPage, urlError, isChangedWithArrows } =
    useSelector((state) => state.search);
  const { value, pageNumber } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let requestChecker = currentRequest === value;
  let pageChecker = currentPage === +pageNumber;
  useEffect(() => {
    if (urlError) {
      navigate('/page_not_found');
      return;
    }
    if (pageNumber != currentPage && !isChangedWithArrows) {
      dispatch(setCurrentPage(pageNumber));
    }
    dispatch(setIsChangedWithArrows(false));
    dispatch(setCurrentRequest(value));

    dispatch(fetchData({ type: 'FETCH_USERS', value, pageNumber }));
    return () => {
      dispatch(reset());
    };
  }, [requestChecker, pageChecker]);

  return (
    <div>
      <Header />
      <div className={styles.table}>
        <div className={styles.header}>
          <h3>Repo name</h3>
          <h3>Stars count</h3>
          <h3>Updated at:</h3>
          <h3>GitHub link</h3>
        </div>
        {isLoading ? (
          <div className={styles.loaderContainer}>
            <Spinner />
          </div>
        ) : (
          <div className={styles.cardsWrapper}>
            <RepoCard repos={repos} />

            {value ? <Pagination /> : ''}
          </div>
        )}
      </div>
    </div>
  );
};

export default RepoContainer;
