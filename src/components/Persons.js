import React from 'react'
import Person from './Person'

const Persons = ({ persons, filter }) => {
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const rows = () =>
    personsToShow.map(person => <Person person={person} />)
    
  return (
    <>
    {rows()}
    </>
  )
}

export default Persons