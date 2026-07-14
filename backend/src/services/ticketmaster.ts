export async function fetchEventsFromTicketmaster(city: string) {
    try{
        const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?city=${city}&apikey=${process.env.TICKETMASTER_API_KEY}`);
        const eventsData = await response.json();

        
        if(!eventsData._embedded){
            return [];
        }
        const rawEvents = eventsData._embedded.events;

        const normalizedEvents = rawEvents.map((event: any) => ({
            title: event.name,
            id: event.id,
            url: event.url,
            date: event.dates.start.localDate,
            location: event._embedded.venues[0].name,
            category: event.classifications[0].segment.name,
            source: 'Ticketmaster',
            description: event.info || event.pleaseNote ||'',
            startTime: `${event.dates.start.localDate}T${event.dates.start.localTime}`,
            endTime: '',
            timezone: event.dates.timezone
        }));

        return normalizedEvents
    }catch(error){
        console.error('Error fetching events from Ticketmaster:', error);
        return [];
    }
}


