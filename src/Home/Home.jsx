import React from 'react';
import Header from '../Header/Header';
import RepoContainer from '../RepoContainer/RepoContainer';
import Search from '../search/search';

const Home = () => {
  return (
    <div>
      <Search />
      <Header />
      <RepoContainer />
    </div>
  );
};

export default Home;
