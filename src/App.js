import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const addPerson = (e) => {
    e.preventDefault()
    let personExists = false
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        personExists = true
      }
    }
    if (!personExists) {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
      clearForm()
    } else {
      alert(`${newName} is already add to the phonebook`)
      setNewName('')
      setNewNumber('')
      clearForm()
    }
  }

  const clearForm = () => document.getElementById('phonebook-form').reset()
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChangeEvent={handleFilterChange} />
      <h3>Add New Entry</h3>
      <PersonForm 
        submitEvent={addPerson}
        nameChange={handleNameChange}
        numberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App