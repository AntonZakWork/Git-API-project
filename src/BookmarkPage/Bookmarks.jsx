import React from 'react';
import { useEffect } from 'react';
import { ReactComponent as BookmarkAdd } from '../assets/bookmarks/BookmarkAdd.svg';
import { useSelector } from 'react-redux';
import RepoBookmark from '../RepoBookmark/RepoBookmark';
import './Bookmarks.scss';
const Bookmarks = () => {
  useEffect(() => {});
  const { bookmarks } = useSelector((state) => state.bookmark);
  return bookmarks.length === 0 ? (
    <div className="emptyBookmarks">
      You don't have any bookmarks. Add them by clicking
      <div className="bookmarkAdd">
        <BookmarkAdd />
      </div>
      next to the repository name.
    </div>
  ) : (
    <div className="bookmarkContainer">
      {bookmarks.map((el, index) => (
        <RepoBookmark key={el.id} el={el} />
      ))}
    </div>
  );
};

export default Bookmarks;
