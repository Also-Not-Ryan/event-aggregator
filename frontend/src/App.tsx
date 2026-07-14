import { useState } from 'react'
import './App.css'
import { getCountrylist } from './utilities/countries'
import { fetchEvents } from './services/eventService'
import EventCard from './components/EventCard'
import type { Event } from './types/event'

function App() {

  const [selectedCountry, setSelectedCountry] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [events, setEvents] = useState<Event[]>([])

  const eventList = events.map((eventData) =>{
      return(
        <EventCard 
            event={eventData}
            key = {eventData.id}
        />
      )
  })

  const countryOptions = getCountrylist().map((pair) => (
      <option value={pair[0]}>{pair[1]}</option>
  ))
  
  const handleSearch = async () =>{
    const results = await fetchEvents(selectedCity, selectedCountry)
    console.log('Results from backend', results)
    setEvents(results)
  }
  

  return (
    <main>
      <button onClick={() => window.location.href = 'http://localhost:3000/auth/google'}>
        Connect Google Calendar
      </button>

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

        <button onClick={handleSearch}>submit</button>

        {eventList}
    </main>
  )
}

export default App
