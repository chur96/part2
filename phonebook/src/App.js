import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas'},
    { name: 'Afro Hellas'},
    { name: 'Gafin Jang'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const addName = (event) => {
    event.preventDefault() 
    const newPerson = {
      name : newName,
      number : newNumber
    }
    persons.find(person => person.name === newPerson.name)
                ? alert(`${newPerson} is already in phonebook`)
                : setPersons(persons.concat(newPerson)) 
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

  const filterNames = search === ''
                    ? persons
                    : persons.filter(person => person.show)

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={search} onChange={handleSearch}></input>
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
         {filterNames.map(person => 
            <li key={person.name}>{person.name} {person.number}</li>
          )}
        </ul>
    </div>
  )
}

export default App