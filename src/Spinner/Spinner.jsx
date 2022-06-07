import './Spinner.css';
import React from 'react';

const Spinner = () => {
  return (
    <>
      <div className="spinnerWrapper">
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      ;
    </>
  );
};

export default Spinner;
