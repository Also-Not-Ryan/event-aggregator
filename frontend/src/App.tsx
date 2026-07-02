import { useState } from 'react'
import './App.css'
import { getCountrylist } from './utilities/countries'

function App() {

  const [selectedCountry, setSelectedCountry] = useState("")

  const [selectedCity, setSelectedCity] = useState("")

  const countryOptions = getCountrylist().map((pair) => (
      <option value={pair[0]}>{pair[1]}</option>
  ))
  
  return (
    <main>
      <select 
      name="countries" 
      id="idk"
      value={selectedCountry} 
      onChange={(e) => setSelectedCountry(e.target.value)}
      >
        {countryOptions}
      </select>


      <input
        type="text"
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        placeholder="e.g. Vancouver"
        ></input>

        <h1>You selected the city {selectedCity} from country {selectedCountry}</h1>

        <input type="submit"></input>
    </main>
  )
}

export default App
