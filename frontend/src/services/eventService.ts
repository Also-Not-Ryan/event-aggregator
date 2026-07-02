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