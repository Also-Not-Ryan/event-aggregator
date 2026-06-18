export async function fetchEventsFromPredictHQ(city: string) {
    try {
        const response = await fetch(`https://api.predicthq.com/v1/events/?q=${city}&category=concerts,festivals,sports,community,performing-arts&active.gte=${new Date().toISOString()}&sort=start&limit=10`, {
            headers: {
                'Authorization': `Bearer ${process.env.PREDICTHQ_API_KEY}`
            }
        });
        const eventsData = await response.json();

        console.log('PredictHQ API response:', eventsData); // Log the raw response for debugging
        return eventsData;
    }catch (error) {
        console.error('Error fetching events from PredictHQ:', error);
        return [];
    }
}