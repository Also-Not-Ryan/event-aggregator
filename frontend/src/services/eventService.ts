export async function callBackEnd(city:string, country:string){
    try{
        const response = await fetch(`http://localhost:3000/events?city=${city}&country=${country}`);
        return response;
    }catch (error){
        console.error('Error calling backend from frontend', error);
        return [];
    }
}