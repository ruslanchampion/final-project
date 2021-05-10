import React from 'react';
import spinner from './spinner.gif'


export const Spinner = () => {
  return (
    <img src={spinner} alt="Spinner" style={{
      width: 70,
      height: 70,
      margin: '15px auto',
      userDrag: 'none',
  }} />
  );
};

