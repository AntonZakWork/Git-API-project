import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchData, setCurrentPage, setIsLoading } from '../redux/Slices/SearchSlice';
import './Pagination.css';

const Pagination = () => {
  const { pagesArr, currentPage, currentRequest } = useSelector((state) => state.search);

  const dispatch = useDispatch();

  let { value, pageNumber } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    debugger;
    if (value === currentRequest && pageNumber == currentPage) return;
    dispatch(fetchData({ type: 'FETCH_USERS', value, pageNumber }));
  }, []);

  const changePage = (pageNumber) => {
    debugger;
    navigate(`/search/${value}/${pageNumber}`);
    dispatch(setIsLoading(true));
    dispatch(setCurrentPage(pageNumber));
    if (value === currentRequest && +pageNumber === currentPage) return;
    dispatch(fetchData({ type: 'FETCH_USERS', value, pageNumber }));
  };

  return (
    <>
      {pagesArr.length !== 0 && (
        <div className="paginationContainer">
          <button
            disabled={+currentPage === 1 ? true : ''}
            onClick={() => {
              debugger;
              pageNumber -= 1;
              dispatch(setIsLoading(true));
              dispatch(fetchData({ type: 'FETCH_USERS', value, pageNumber }));
              dispatch(setCurrentPage(pageNumber - 1));
            }}
            className={`pageButton ${+currentPage === 1 ? 'disabled' : ''}`}>
            {' '}
            &lt;{' '}
          </button>

          {pagesArr.map((el) => {
            if (currentPage === el) {
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
            disabled={+currentPage === pagesArr.length ? true : ''}
            onClick={() => {
              debugger;
              pageNumber += 1;
              dispatch(setIsLoading(true));
              dispatch(fetchData({ type: 'FETCH_USERS', value, pageNumber }));
              dispatch(setCurrentPage(pageNumber + 1));
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
