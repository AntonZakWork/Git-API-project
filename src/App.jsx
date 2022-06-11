import './App.scss';

import Repo from './Repo/Repo';
import { Route, Routes, useNavigate } from 'react-router-dom';
import RepoContainer from './RepoContainer/RepoContainer';
import NotFound from './404/NotFound';
import ThemeButton from './ThemeButton/ThemeButton';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from './redux/Slices/SearchSlice';

import { useEffect } from 'react';
import ErrorPage from './404/ErrorPage';

function App() {
  const dispatch = useDispatch();
  let { theme, urlError, serverError } = useSelector((state) => state.search);
  const navigate = useNavigate();
  if (localStorage.getItem('theme') === 'light') {
    dispatch(setTheme('light'));
  }
  useEffect(() => {
    debugger;
    if (urlError) navigate('/page_not_found');
    if (serverError) navigate('/error');
  }, [urlError, serverError]);
  return (
    <>
      <div className={theme}>
        <div className="appContainer">
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
