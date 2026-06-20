export async function fetchEventsFromPredictHQ(city: string) {
    try {
        const response = await fetch(`https://api.predicthq.com/v1/events/?q=${city}&category=concerts,festivals,sports,community,performing-arts&active.gte=${new Date().toISOString()}&sort=start&limit=10`, {
            headers: {
                'Authorization': `Bearer ${process.env.PREDICTHQ_API_KEY}`
            }
        });
        const eventsData = await response.json();

        
        if(!eventsData.results){
            return [];
        }
        const rawEvents = eventsData.results;

        
        const normalizedEvents = rawEvents.map((event: any) => ({
            title: event.title,
            id: event.id,
            url: `https://www.google.com/search?q=${encodeURIComponent(event.title)}`,
            date: event.start_local,
            location: event.entities.find((e: any) => e.type === 'venue')?.name || 'Unknown location',
            category: event.category,
            source: 'PredictHQ',
            description: event.description || ''
        }));

        return normalizedEvents;
    }catch (error) {
        console.error('Error fetching events from PredictHQ:', error);
        return [];
    }
}