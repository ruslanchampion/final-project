import React from 'react';
import spinner from './spinner.gif'


export const Spinner = () => {
  return (
    <img src={spinner} alt="Spinner" style={{
      width: 45,
      margin: 'auto',
      userSelect: 'none',
  }} />
  );
};

