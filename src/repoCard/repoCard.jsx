import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setIsLoading } from '../redux/Slices/SearchSlice';
import './repoCard.scss';
import image from '../assets/star.png';

const RepoCard = () => {
  const { repos } = useSelector((state) => state.search);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        {repos.map((el) => (
          <>
            <div key={el.url} className="container">
              <div
                onClick={() => {
                  dispatch(setIsLoading(true));
                  navigate(`/repo/${el.full_name}`);
                }}
                className="linkedProp"
                key={el.id}>
                {el.name}
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
                className="prop"
                key={el.updated_at}>
                {el.updated_at.toString().slice(0, 10)}
              </div>
              <div className="linkedProp" key={el.svn_url}>
                <a href={el.svn_url} rel="noreferrer" target="_blank">
                  Open with GitHub
                </a>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default RepoCard;
