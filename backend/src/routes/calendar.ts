import { Router } from 'express';
import { oauth2Client } from "../services/googleAuth";
import { google } from 'googleapis'
import type { calendar_v3 } from 'googleapis'
type GoogleCalendarEvent = calendar_v3.Schema$Event;

const router = Router();

router.put('/add', async (req, res) => {
    const event = req.body;

    const googleEvent: GoogleCalendarEvent = {
        summary: event.title,       
        location: event.location,       
        description: event.discription,    
    start: {
        dateTime: '',   // ISO format date string
        timeZone: ''    // e.g. 'America/Vancouver'
    },
    end: {
        dateTime: '',   // Google requires an end time
        timeZone: ''
    }
    }

    const calendar = google.calendar({version: 'v3', auth: oauth2Client})

    calendar.events.insert({
        calendarId: 'primary'
    })
});

export default router