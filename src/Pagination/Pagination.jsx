import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  changeCurrPageArrow,
  fetchSearchUsers,
  setCurrentPage,
  setIsLoading,
} from '../redux/Slices/SearchSlice';
import './Pagination.css';

const Pagination = () => {
  const { pagesArr, currentPage, currentRequest } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const { value, pageNumber } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    debugger;
    if (value === currentRequest && +pageNumber === currentPage) return;
    dispatch(fetchSearchUsers({ value, pageNumber }));
  }, []);

  const changePage = (pageNumber) => {
    navigate(`/search/${value}/${pageNumber}`);
    dispatch(setIsLoading(true));
    dispatch(setCurrentPage(pageNumber));
    if (value === currentRequest && +pageNumber === currentPage) return;
    dispatch(fetchSearchUsers({ value, pageNumber }));
  };

  return (
    <>
      {pagesArr.length !== 0 && (
        <div className="paginationContainer">
          <span
            onClick={() => {
              dispatch(changeCurrPageArrow(1));
              dispatch(setIsLoading(true));
              dispatch(fetchSearchUsers());
            }}
            className="arrow">
            {' '}
            &lt;{' '}
          </span>
          <span>
            {pagesArr.map((el) => {
              if (currentPage === el) {
                return (
                  <button
                    data-page={el}
                    className="pageNumber active"
                    onClick={() => changePage(el)}
                    key={el}>
                    {el}
                  </button>
                );
              } else {
                return (
                  <button
                    data-page={el}
                    className="pageNumber"
                    onClick={() => changePage(el)}
                    key={el}>
                    {el}
                  </button>
                );
              }
            })}
          </span>
          <span
            onClick={() => {
              dispatch(changeCurrPageArrow(1));
              dispatch(setIsLoading(true));
              dispatch(fetchSearchUsers());
            }}
            className="arrow">
            &gt;
          </span>
        </div>
      )}
    </>
  );
};

export default Pagination;
