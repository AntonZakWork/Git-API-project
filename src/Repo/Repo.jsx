import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../redux/Slices/SearchSlice';
import { useParams } from 'react-router-dom';
import styles from './Repo.module.css';

import RepoInfo from './RepoInfo/RepoInfo';
import Spinner from '../Spinner/Spinner';

const Repo = () => {
  const { isLoading } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const { author, repo } = useParams();

  useEffect(() => {
    dispatch(fetchData({ type: 'responseRepo', author, repo }));
  }, []);

  return <>{isLoading ? <Spinner /> : <RepoInfo />}</>;
};

export default Repo;
