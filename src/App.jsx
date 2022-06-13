import './App.scss';

import Repo from './Repo/Repo';
import { Route, Routes, useNavigate } from 'react-router-dom';
import RepoContainer from './RepoContainer/RepoContainer';
import NotFound from './404/NotFound';
import ThemeButton from './ThemeButton/ThemeButton';
import { useDispatch, useSelector } from 'react-redux';
import { changeShowPopup, setTheme } from './redux/Slices/SearchSlice';

import { useEffect } from 'react';
import ErrorPage from './404/ErrorPage';

function App() {
  const dispatch = useDispatch();
  let { theme } = useSelector((state) => state.search);

  if (localStorage.getItem('theme') === 'light') {
    dispatch(setTheme('light'));
  }

  return (
    <>
      <div className={theme}>
        <div
          onClick={() => {
            debugger;
            dispatch(changeShowPopup(false));
          }}
          className="appContainer">
          <ThemeButton />
          <Routes>
            <Route path="/" element={<RepoContainer />} />
            <Route path="/repo/:author/:repo" element={<Repo />} />
            <Route path="/search/:value/:pageNumber" element={<RepoContainer />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
