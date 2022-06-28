import React, { useState } from 'react';
import './RepoBookmark.scss';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setIsLoading } from '../redux/Slices/SearchSlice';
import { deleteBookMark } from '../redux/Slices/BookmarkSlice';
const RepoBookmark = ({ el }) => {
  const [deleted, setDeleted] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const timedDelete = () => {
    setTimeout(() => {
      dispatch(deleteBookMark(el.id));
    }, 100);
  };
  return (
    <>
      <div
        onClick={() => {
          dispatch(setIsLoading(true));
          navigate(`/repo/${el.link}`);
        }}
        className={deleted ? 'RepoBookmark deleted' : 'RepoBookmark'}>
        <button
          className="remove"
          onClick={(e) => {
            setDeleted(true);
            timedDelete();
            e.stopPropagation();
          }}>
          {'\u{274C}'}
        </button>
        <div className="bookmarkHeader">
          <div>{el.name}</div>
        </div>
        <img src={el.avatar_url} alt="" />
      </div>
    </>
  );
};

export default RepoBookmark;
