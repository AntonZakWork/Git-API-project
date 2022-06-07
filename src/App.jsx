import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './App.module.css';

import Repo from './Repo/Repo';

import {
  setCurrentRequest,
  setSearchInput,
  fetchInitUsers,
  fetchSearchUsers,
  setCurrentPage,
} from './redux/Slices/SearchSlice';
import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import Search from './Search/Search';
import RepoContainer from './RepoContainer/RepoContainer';

function App() {
  return (
    <>
      <div className={styles.window}>
        <div className={styles.appContainer}>
          <Search />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/repo/:name" element={<Repo />} />
            <Route path="/search/:value/:pageNumber" element={<RepoContainer />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
