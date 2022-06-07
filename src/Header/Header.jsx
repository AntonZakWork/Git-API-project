import React from 'react';
import { useSelector } from 'react-redux';
const Header = () => {
  const { currentRequest } = useSelector((state) => state.search);
  return (
    <div>
      {' '}
      {currentRequest ? <h3>Search request "{currentRequest}"</h3> : <h3>Top 10 repos</h3>}
    </div>
  );
};

export default Header;
