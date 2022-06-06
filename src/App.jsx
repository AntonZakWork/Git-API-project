import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './App.module.css';

import Repo from './Profile/Repo';

import {
  setCurrentRequest,
  setSearchInput,
  fetchInitUsers,
  fetchSearchUsers,
  setCurrentPage,
} from './redux/Slices/SearchSlice';
import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home';

function App() {
  const { currentRequest, currentPage } = useSelector((state) => state.search);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedRequest = localStorage.getItem('currentRequest');
    const storedPage = localStorage.getItem('currentPage');
    if (storedRequest) {
      dispatch(setCurrentRequest(storedRequest));
      dispatch(setCurrentPage(storedPage));
      dispatch(fetchSearchUsers());
      dispatch(setSearchInput(storedRequest));
    } else dispatch(fetchInitUsers());
  }, []);

  useEffect(() => {
    localStorage.setItem('currentRequest', currentRequest);
    localStorage.setItem('currentPage', currentPage.toString());
  }, [currentRequest, currentPage]);

  return (
    <>
      <div className={styles.window}>
        <div className={styles.appContainer}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:name" element={<Repo />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
