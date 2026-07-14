import type { Event } from '../types/event'

export async function fetchEvents(city:string, country:string){
    try{
        const response = await fetch(`http://localhost:3000/events?city=${city}&country=${country}`);
        const data = await response.json()
        return data;
    }catch (error){
        console.error('Error calling backend from frontend', error);
        return [];
    }
}

export async function addToCalendar(event:Event){
    try{
        await fetch('http://localhost:3000/calendar/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
        })
    }catch (error){
        console.error('Error posting from frontend to backend', error);
    }
}