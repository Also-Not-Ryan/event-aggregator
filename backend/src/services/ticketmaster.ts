

export async function fetchEventsFromTicketmaster(city: string) {
    try{
        const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?city=${city}&apikey=${process.env.TICKETMASTER_API_KEY}`);
        const eventsData = await response.json();

        console.log(JSON.stringify(eventsData, null, 2))

        return eventsData
    }catch(error){
        console.error('Error fetching events from Ticketmaster:', error);
        return [];
    }
}