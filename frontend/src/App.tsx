import { useState } from 'react'
import './App.css'
import { getCountrylist } from './utilities/countries'
import { fetchEvents } from './services/eventService'
import EventCard from './components/EventCard'
import type { Event } from './types/event'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import GoogleCalendarModal from './components/GoogleCalendarModal'
import { addToCalendar } from './services/eventService'


function App() {

  const [addedEvents, setAddedEvents] = useState<Event[]>([])

  const handleAddToCalendar = async (event: Event) => {
      await addToCalendar(event)
      setAddedEvents((prev) =>
          prev.some((e) => e.id === event.id) ? prev : [...prev, event]
      )
  }


  const [showCalendarModal, setShowCalendarModal] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('connected') === 'true') {
        localStorage.setItem('googleCalendarConnected', 'true')
        return false
    }
    return localStorage.getItem('googleCalendarConnected') !== 'true'
  })
  const [selectedCountry, setSelectedCountry] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [events, setEvents] = useState<Event[]>([])

  const eventList = events.map((eventData) =>{
      return(
        <EventCard 
            event={eventData}
            onAddToCalendar={handleAddToCalendar}
            key = {eventData.id}
        />
      )
  })

const handleConnectGoogleCalendar = () => {
    window.location.href = 'http://localhost:3000/auth/google'
}


  const countryOptions = getCountrylist().map((pair) => (
      <option value={pair[0]}>{pair[1]}</option>
  ))
  
  const handleSearch = async () =>{
    const results = await fetchEvents(selectedCity, selectedCountry)
    console.log('Results from backend', results)
    setEvents(results)
  }
  
  const calendarEvents = addedEvents.map((event)=>({
    id: String(event.id),
    title: event.title,
    start: event.startTime,
    ...(event.endTime ? { end : event.endTime } : {}),
  }))
  return (
    <main>

    {showCalendarModal && (
    <GoogleCalendarModal
        onConnect={handleConnectGoogleCalendar}
        onDismiss={() => setShowCalendarModal(false)}
    />
    )}


      <div className="search-pannel">
        <div className="user-selection">

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
          <button onClick={handleSearch}>submit</button>

        </div>
        
        <div className="event-list">
            {eventList}
        </div>

      </div>


      <div className="calendar">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView='dayGridMonth'
          events={calendarEvents}
          height="100%"
        />
      </div>
    </main>
  )
}

export default App
