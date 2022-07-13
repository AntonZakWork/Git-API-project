import React from 'react';
import { ReactComponent as BookmarkAdd } from '../assets/bookmarks/BookmarkAdd.svg';
import { ReactComponent as BookmarkAdded } from '../assets/bookmarks/BookmarkAdded.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setIsLoading } from '../redux/Slices/SearchSlice';
import './repoCard.scss';

import image from '../assets/star.png';
import { addBookMark, deleteBookMark } from '../redux/Slices/BookmarkSlice';

const RepoCard = () => {
  const { repos } = useSelector((state) => state.search);
  const { bookmarkedIds } = useSelector((state) => state.bookmark);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      {repos.map((el) => (
        <div key={el.url} className="container">
          <div
            onClick={() => {
              dispatch(setIsLoading(true));
              navigate(`/repo/${el.full_name}`);
            }}
            className="linkedProp"
            key={el.id}>
            {el.name}
            {bookmarkedIds.includes(el.owner.id) ? (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(deleteBookMark(el.owner.id));
                }}
                className="bookmarkAdd active">
                <BookmarkAdded />
              </div>
            ) : (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(addBookMark(el));
                }}
                className="bookmarkAdd">
                <BookmarkAdd />
              </div>
            )}
          </div>

          <div
            onClick={() => {
              dispatch(setIsLoading(true));
              navigate(`/repo/${el.full_name}`);
            }}
            className="prop"
            key={el.stargazers_count}>
            <img className="star" src={image} alt="" />
            {el.stargazers_count}
          </div>
          <div
            onClick={() => {
              dispatch(setIsLoading(true));
              navigate(`/repo/${el.full_name}`);
            }}
            className="prop updated"
            key={el.updated_at}>
            {el.updated_at.toString().slice(0, 10)}
          </div>
          <div className="linkedProp" key={el.svn_url}>
            <a href={el.svn_url} rel="noreferrer" target="_blank">
              Open with GitHub
            </a>
          </div>
        </div>
      ))}
    </>
  );
};

export default RepoCard;
