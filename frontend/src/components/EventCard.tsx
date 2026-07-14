import { addToCalendar } from "../services/eventService"

export default function EventCard(props: any){
    const event = props.event
    return(
        <>
            <div>
                <h3>{event.title}</h3>
                <h4>location: {event.location}</h4>
                <h4>date: {event.date}</h4>
                <h4>category: {event.category}</h4>
                <p>{event.description}</p>
                <p>url: {event.url}</p>

                <button onClick={() => addToCalendar(event)}>
                    Add to Calendar
                </button>

            </div>
        </>
    )

}