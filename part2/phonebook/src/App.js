/* eslint-disable no-restricted-globals */
import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({ search, setSearch }) => <div>filter show with <input value={search} onChange={(e) => setSearch(e.target.value)} /></div>

const PersonForm = ({ handleAddPerson, newName, newNumber, setNewName, setNewNumber }) =>
  <form onSubmit={handleAddPerson}>
    <div>
      name: <input onChange={(e) => setNewName(e.target.value)} value={newName} />
    </div>
    <div>
      number: <input onChange={(e) => setNewNumber(e.target.value)} value={newNumber} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>

const Persons = ({ persons, onDelete }) => persons.map(person => <p className='person' key={person.id}>{person.name} {person.number} <button value={person.id} onClick={onDelete}>delete</button></p>)

const Notification = ({ message }) => <div className='noti'>{message}</div>
const ErrorMessage = ({ message }) => <div className='error'>{message}</div>

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('');
  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleAddPerson = (e) => {
    e.preventDefault()
    const existedPerson = persons.find(person => person.name === newName);
    if (existedPerson) {
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .updateOne({ ...existedPerson, number: newNumber })
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person))
            setNotification(`${updatedPerson.name}'s number has changed`)
          })
      }
    }
    else {
      personService
        .createOne({ name: newName, number: newNumber })
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setNotification(`Add ${newPerson.name}`)
        })
    }
    setTimeout(() => setNotification(null), 5000)
    setNewName('')
    setNewNumber('')
  }

  const handleDeletePerson = (e) => {
    const deletePerson = persons.find(person => person.id === +e.target.value)
    if (confirm(`Delete ${deletePerson.name}?`)) {
      personService
        .deleteOne(e.target.value)
        .then(data => setPersons(persons.filter(person => person.id !== +e.target.value)))
        .catch(error => {
          setErrorMessage(`Infomation of ${deletePerson.name} has already been removed from server`)
          setTimeout(() => setErrorMessage(null), 5000)
        })
    }
  }

  useEffect(() => {
    personService.getAll().then(data => setPersons(data))
  }, [])


  return (
    <div>
      <h1>Phonebook</h1>

      {notification ? <Notification message={notification} /> : <></>}
      {errorMessage ? <ErrorMessage message={errorMessage} /> : <></>}

      <Filter search={search} setSearch={setSearch} />

      <h3>Add a new</h3>

      <PersonForm
        handleAddPerson={handleAddPerson}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />

      <h3>Numbers</h3>

      {persons.length === 0 ? <p>Loading...</p> : <Persons persons={persons.filter(person => person.name.toLowerCase().includes(search))} onDelete={handleDeletePerson} />}
    </div>
  )
}


export default App