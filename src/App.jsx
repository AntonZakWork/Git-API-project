import styles from './App.module.css';

import Repo from './Repo/Repo';
import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import Search from './Search/Search';
import RepoContainer from './RepoContainer/RepoContainer';
import NotFound from './404/NotFound';

function App() {
  return (
    <>
      <div className={styles.appContainer}>
        <Search />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/repo/:author/:repo" element={<Repo />} />
          <Route path="/search/:value/:pageNumber" element={<RepoContainer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
