import './App.scss';

import Repo from './Repo/Repo';
import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import Search from './Search/Search';
import RepoContainer from './RepoContainer/RepoContainer';
import NotFound from './404/NotFound';
import ThemeButton from './ThemeButton/ThemeButton';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from './redux/Slices/SearchSlice';

function App() {
  const dispatch = useDispatch();
  let theme = useSelector((state) => state.search.theme);

  if (localStorage.getItem('theme') === 'light') {
    dispatch(setTheme('light'));
  }

  return (
    <>
      <div className={theme}>
        <div className="appContainer">
          <ThemeButton />
          <Search />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/repo/:author/:repo" element={<Repo />} />
            <Route path="/search/:value/:pageNumber" element={<RepoContainer />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
