import { Router } from 'express';
import {fetchEventsFromTicketmaster } from '../services/ticketmaster.js';

const router = Router();

router.get('/', async (req, res) => {
    res.send('Events endpoint');
    const events = await fetchEventsFromTicketmaster('Vancouver');
    res.json(events);

    //const city = req.query.city
    // call fetchEventsFromTicketmaster with city
    // send the result back with res.json()
})

export default router;