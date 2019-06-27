import React from 'react';

const PersonForm = ({ submitEvent, nameChange, numberChange }) => {
  return (
    <form onSubmit={submitEvent} id="phonebook-form">
      <div>name: <input onChange={nameChange} /></div>
      <div>number: <input onChange={numberChange} /></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm