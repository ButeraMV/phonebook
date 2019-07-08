import React from 'react';

const Person = ({ person, deletePersonButtonEvent }) => {
  return (
    <p>{person.name} {person.number} <button onClick={deletePersonButtonEvent}>delete</button></p>
  )
}

export default Person