import { Router } from 'express';
import { oauth2Client } from "../services/googleAuth";
import { google } from 'googleapis'
import type { calendar_v3 } from 'googleapis'
type GoogleCalendarEvent = calendar_v3.Schema$Event;

const router = Router();

router.post('/add', async (req, res) => {
    try{
        const event = req.body;
    
        const startDate = new Date(event.startTime);
        const endDate = new Date(startDate.getTime() + 2*60*60*1000);
        event.endTime = endDate.toISOString()
    
        const googleEvent: GoogleCalendarEvent = {
            summary: event.title,       
            location: event.location,       
            description: event.description,    
        start: {
            dateTime: event.startTime, 
            timeZone: event.timezone
        },
        end: {
            dateTime: event.endTime,   
            timeZone: event.timezone
        }
        }
    
        const calendar = google.calendar({version: 'v3', auth: oauth2Client})
    
        await calendar.events.insert({
            calendarId: 'primary',
            requestBody: googleEvent
        })
    
        res.json({ success: true, message: 'Event added to Google Calendar' })
    }catch (error){
        console.error('Error adding to calendar:', error)
        res.status(500).json({ error: 'Failed to add event to calendar' })
    }
});

export default router