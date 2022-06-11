import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../redux/Slices/SearchSlice';
import './ThemeButton.scss';
const ThemeButton = () => {
  let { theme } = useSelector((state) => state.search);

  const dispatch = useDispatch();

  return (
    <>
      <div className="themeButtons">
        {theme === 'light' ? (
          <button onClick={() => dispatch(setTheme('dark'))} className="themeButtonDark">
            {'\u{1f31a}'}
          </button>
        ) : (
          <button onClick={() => dispatch(setTheme('light'))} className="themeButtonLight">
            {'\u{1f31d}'}
          </button>
        )}
      </div>
    </>
  );
};

export default ThemeButton;
