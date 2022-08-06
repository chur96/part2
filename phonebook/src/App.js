import { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(['', ''])

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPhone => setPersons(initialPhone))
  },[persons.length])

  const addName = (event) => {
    event.preventDefault() 
    const newPerson = {
      name : newName,
      number : newNumber
    }

    persons.find(person => person.name === newPerson.name)
                ? phonebookService
                  .update(persons.find(person => person.name === newPerson.name).id, newPerson)
                  .then(updatedPhone => {                     
                    setPersons(persons.map(person => person.id !== updatedPhone.id ? person : updatedPhone))
                    setMessage([`Update number for ${updatedPhone.name} to ${updatedPhone.number}`, 'green'])
                    setTimeout(() => setMessage(['','']), 5000)
                  })
                  .catch(error => {
                    setMessage([`${newPerson.name} was already removed from server`, 'red'])
                    setTimeout(() => setMessage(['','']), 5000)
                  })

                : phonebookService
                  .create(newPerson)
                  .then(newPerson => {                     
                    setPersons(persons.concat(newPerson))
                    setMessage([`Added ${newPerson.name} to Phonebook`,'green'])
                    setTimeout(() => setMessage(['','']), 5000)
                  })

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearch = (event) => { 
    setSearch(event.target.value)
    persons.forEach(person => {
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
      ? person['show'] = true 
      : person['show'] = false
    })
    setPersons(persons)
  }

  const Person = (person) => <li>{person.props.name} {person.props.number} 
                          <button onClick={() => {
                              phonebookService.deletePhone(person.props.id)
                              setPersons([])
                            }}>Delete</button></li>

  const Phonebook = ({persons, search}) => {
    const filterNames = search === ''
                      ? persons
                      : persons.filter(person => person.show)
    return(
      filterNames.map(person => 
        <Person key={person.id} props={person}></Person>
      ))
  }

  const Filter = (props) => {
    return(<input value={props.value} onChange={props.onChange}></input>)
  }

  const Notification = ({message}) => {

    const messageStyle = {
      backgroundColor: 'lightgrey',
      color: message[1],
      padding: 10,

      borderWidth: 3,
      borderStyle: 'solid',
      borderColor: message[1],
      marginBottom: 5
       
    }

    if (message[0] === ''){
      return message[0]
    }

    return(
      <div className='notification' style={messageStyle}>{message[0]}</div>
    )
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message}></Notification>
      <div>
        filter shown with <Filter value={search} onChange={handleSearch}></Filter>
      </div>
      <h3>Add a number</h3>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}></input>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <ul>
          <Phonebook persons={persons} search={search} state={setPersons}></Phonebook>
        </ul>
    </div>
  )
}

export default App