import React from 'react';

const Filter = ({ onChangeEvent }) => {
  return (
    <p>filter shown with <input onChange={onChangeEvent} /></p>
  )
}

export default Filter