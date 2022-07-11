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
import Header from './Header/Header';
import Bookmarks from './BookmarkPage/Bookmarks';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { theme, urlError, serverError } = useSelector((state) => state.search);
  useEffect(() => {
    if (urlError) navigate('/page_not_found');
    if (serverError) navigate('/error');
  }, [urlError, serverError]);

  if (localStorage.getItem('theme') === 'dark') {
    dispatch(setTheme('dark'));
  }

  return (
    <>
      <div className={theme}>
        <div
          onClick={() => {
            dispatch(changeShowPopup(false));
          }}
          className="appContainer">
          <ThemeButton />
          <Header />
          <Routes>
            <Route path={'/'} element={<RepoContainer />} />
            <Route path={'/Git-API-project'} element={<RepoContainer />} />
            <Route path="/repo/:author/:repo" element={<Repo />} />
            <Route path="/search/:value/:pageNumber" element={<RepoContainer />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
