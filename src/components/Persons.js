import React from 'react'
import Person from './Person'

const Persons = ({ persons, filter, deletePersonButtonEvent }) => {
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const rows = () =>
    personsToShow.map(person => <Person key={person.id} person={person} deletePersonButtonEvent={() => deletePersonButtonEvent(person.id)}/>)
    
  return (
    <>
    {rows()}
    </>
  )
}

export default Persons