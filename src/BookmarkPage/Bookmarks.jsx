import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import RepoBookmark from '../RepoBookmark/RepoBookmark';
import './Bookmarks.scss';
const Bookmarks = () => {
  useEffect(() => {});
  const { bookmarks } = useSelector((state) => state.bookmark);

  return (
    <div className="bookmarkContainer">
      {bookmarks.map((el, index) => (
        <RepoBookmark key={el.id} el={el} />
      ))}
    </div>
  );
};

export default Bookmarks;
