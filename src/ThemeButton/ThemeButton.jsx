import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/Slices/SearchSlice';
import './ThemeButton.scss';
const ThemeButton = () => {
  const { theme } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  return (
    <>
      <div className="themeButtons">
        {theme === 'light' ? (
          <button onClick={() => dispatch(toggleTheme())} className="themeButtonDark">
            {'\u{1f31a}'}
          </button>
        ) : (
          <button onClick={() => dispatch(toggleTheme())} className="themeButtonLight">
            {'\u{1f31d}'}
          </button>
        )}
      </div>
    </>
  );
};

export default ThemeButton;
