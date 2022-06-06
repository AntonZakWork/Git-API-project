import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeCurrPageArrow,
  fetchSearchUsers,
  setCurrentPage,
  setIsLoading,
} from '../redux/Slices/SearchSlice';
import './Pagination.css';

const Pagination = () => {
  const { pagesArr, currentPage } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 100);
  });

  const changePage = (page) => {
    dispatch(setIsLoading(true));
    dispatch(setCurrentPage(page));
    dispatch(fetchSearchUsers());
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
                  <span className="pageNumber active" onClick={() => changePage(el)} key={el}>
                    {el}
                  </span>
                );
              } else {
                return (
                  <span className="pageNumber" onClick={() => changePage(el)} key={el}>
                    {el}
                  </span>
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
