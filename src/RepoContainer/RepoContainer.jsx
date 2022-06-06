import React from 'react';
import { useSelector } from 'react-redux';
import Pagination from '../Pagination/Pagination';
import RepoCard from '../repoCard/repoCard';

const RepoContainer = () => {
  const { currentRequest, repos, isLoading } = useSelector((state) => state.search);
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <RepoCard repos={repos} />
          {currentRequest ? <Pagination /> : ''}
        </div>
      )}
    </div>
  );
};

export default RepoContainer;
