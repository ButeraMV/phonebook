import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({ message: null, type: null })

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

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

    // Check to see if person exists and set personExists variable boolean value
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name.toLowerCase() === newName.toLowerCase()) {
        personExists = true
      }
    }

    const personObject = {
      name: newName,
      number: newNumber,
    }

    if (!personExists) { // Person doesn't exist yet
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNotification({message: `${returnedPerson.name} has been added to the Phonebook.`, type: 'success' })
          setTimeout(() => {
            setNotification({message: null, type: null})
          }, 5000)
          setNewName('')
          setNewNumber('')
          clearForm()
        })
        .catch(error => {
          setNotification({ message: `${error.response.data.error}`, type: 'error' })
          setTimeout(() => {
            setNotification({ message: null, type: null })
          }, 5000)
        })
    } else { // Person already exists
      if (window.confirm(`${personObject.name} is already in the phonebook. Replace the old number with the new one?`)) {
        updatePerson(personObject)
      } else {
        setNewName('')
        setNewNumber('')
        clearForm()
      }
    }
  }

  const updatePerson = (personObject) => {
    const personToUpdate = persons.find(person => person.name.toLowerCase() === personObject.name.toLowerCase())
    const updatedPerson = {...personToUpdate, number: personObject.number}

    personService
      .update(personToUpdate.id, updatedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== personToUpdate.id ? person : returnedPerson))
        setNotification({ message: `${updatedPerson.name} has been updated.`, type: 'success' })
        setTimeout(() => {
          setNotification({ message: null, type: null })
        }, 5000)
      })
      .catch(error => {
        setNotification(
          { message: `${personToUpdate.name} was already removed from server`, type: 'error' }
        )
        setTimeout(() => {
          setNotification({message: null, type: null})
        }, 5000)
        setPersons(persons.filter(person => person.id !== personToUpdate.id))
      })
  }

  const deletePersonButtonHandler = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(person.id)
        .then(setPersons(persons.filter(p => p.id !== id)))
        .catch(error => {
          setNotification(
            { message: `${person.name} was already removed from server`, type: 'error' }
          )
          setTimeout(() => {
            setNotification({ message: null, type: null })
          }, 5000)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const clearForm = () => document.getElementById('phonebook-form').reset()
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter onChangeEvent={handleFilterChange} />
      <h3>Add New Entry</h3>
      <PersonForm 
        submitEvent={addPerson}
        nameChange={handleNameChange}
        numberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} deletePersonButtonEvent={deletePersonButtonHandler} />
    </div>
  )
}

export default App