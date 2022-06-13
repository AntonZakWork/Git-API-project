import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../redux/Slices/SearchSlice';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import RepoInfo from './RepoInfo/RepoInfo';
import Spinner from '../Spinner/Spinner';
import ErrorPage from '../404/ErrorPage';

const Repo = () => {
  const { isLoading, urlError, serverError } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const { author, repo } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (urlError) navigate('/page_not_found');
    if (serverError) navigate('/error');
  }, [urlError, serverError]);
  useEffect(() => {
    dispatch(fetchData({ type: 'responseRepo', author, repo }));
  }, []);

  return <>{isLoading ? <Spinner /> : serverError ? <ErrorPage /> : <RepoInfo />}</>;
};

export default Repo;
