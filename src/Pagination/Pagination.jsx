import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchData, setCurrentPage } from '../redux/Slices/SearchSlice';
import './Pagination.scss';

const Pagination = () => {
  const { pagesArr, currentPage, currentRequest } = useSelector((state) => state.search);
  const dispatch = useDispatch();

  let { value, pageNumber } = useParams();

  const navigate = useNavigate();

  const changePage = (pageNumber) => {
    navigate(`/search/${value}/${pageNumber}`);
    dispatch(setCurrentPage(pageNumber));
    if (value === currentRequest && +pageNumber === currentPage) return;
    dispatch(fetchData({ type: 'responseSearchUsers', value, pageNumber }));
  };

  return (
    <>
      {pagesArr.length !== 0 && (
        <div className="paginationContainer">
          <button
            hidden={+currentPage === 1}
            onClick={() => {
              pageNumber = +pageNumber - 1;
              dispatch(setCurrentPage(pageNumber));
              navigate(`/search/${currentRequest}/${pageNumber}`);
              dispatch(fetchData({ type: 'responseSearchUsers', value, pageNumber }));
            }}
            className={`pageButton ${+currentPage === 1 ? 'disabled' : ''}`}>
            {' '}
            &lt;{' '}
          </button>

          {pagesArr.map((el) => {
            if (+currentPage == el) {
              return (
                <button
                  data-page={el}
                  className="pageButton active"
                  onClick={() => changePage(el)}
                  key={el}>
                  {el}
                </button>
              );
            } else {
              return (
                <button
                  data-page={el}
                  className="pageButton"
                  onClick={() => changePage(el)}
                  key={el}>
                  {el}
                </button>
              );
            }
          })}

          <button
            hidden={+currentPage === pagesArr.length}
            onClick={() => {
              pageNumber = +pageNumber + 1;
              dispatch(setCurrentPage(pageNumber));
              navigate(`/search/${currentRequest}/${pageNumber}`);
              dispatch(fetchData({ type: 'responseSearchUsers', value, pageNumber }));
            }}
            className={`pageButton ${+currentPage === pagesArr.length ? 'disabled' : ''}`}>
            &gt;
          </button>
        </div>
      )}
    </>
  );
};

export default Pagination;
