import { useState } from "react"


export default function EventCard(props: any){
    const event = props.event

    const categoryColors: Record<string, string> = {
        'Music': '#FF84BA',
        'Sports': '#99C2FF',
        'Arts & Theatre': '#ead7d1',
        'festivals': '#FFDF82',
        'community': '#C5B3D3',
        'performing-arts': '#f5cac3',
        'concerts': '#A4B885',
    }

    const color = categoryColors[event.category] || '#444444'
    const [isExpanded, setIsExpanded] = useState(false)
    return(
        <>
            <div className="event-card">
                
                <div className="event-card-header">
                    <div className="event-card-color-box" style={{backgroundColor: color}}></div>
                    <div className="event-card-title">
                        <h3>{event.title}</h3>
                        <h4>{event.date}</h4>
                    </div>
                    <button 
                        className="event-card-toggle"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        {isExpanded ? '▲' : '▼'}
                    </button>
                    <button className="add-to-calendar-button" onClick={() => props.onAddToCalendar(event)}>
                        Add to Calendar
                    </button>
                </div>
                {isExpanded && (
                    <div className="event-card-details">
                        <p>{event.description}</p>
                        <p>{event.location}</p>
                    </div>
                )}
            </div>
        </>
    )

}