import {useState, useEffect} from 'react';
import axios from 'axios';

const App = () => {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const Country = ({countries, search}) => {

    const filterCountries = search === ''
      ? countries 
      : countries.filter(country => country.show) 

    return(
      filterCountries.length > 10
      ? <div>Too many matches, specify another filter</div>
      : filterCountries.length === 1 
        ? filterCountries.map(country =>
          <div>
            <h2 key={country.cca2}>{country.name.common}</h2>
            <div>capital {country.capital[0]}</div>
            <div>area {country.area}</div>
            <h3>languages:</h3>
              <ul>
                <Language langs={country.languages}></Language>
              </ul>
            <div>
              <img src={country.flags.png}></img>
            </div>
          </div>
          )
        : filterCountries.map(country => 
            <li key={country.cca2}>
              {country.name.common}
            </li>
          )
    )
  }

  const Language = (langs) => { 
    return (
      Object.values(langs.langs).map(lang => <li key={lang}>{lang}</li>)
    ) 
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
    countries.forEach(country => {
      country.name.common.toLowerCase().includes(event.target.value.toLowerCase())
      ? country['show'] = true
      : country['show'] = false
    })
    setCountries(countries)
  }

  return (
    <div>
      <div>find countries <input value={search} onChange={handleSearch}></input></div>
      <div>
        <Country countries={countries} search={search}></Country>
      </div>
    </div>

  );
}

export default App;
