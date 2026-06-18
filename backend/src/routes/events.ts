import { Router } from 'express';
import {fetchEventsFromTicketmaster } from '../services/ticketmaster.js';

const router = Router();

router.get('/', async (req, res) => {
    const city = req.query.city as string
    const events = await fetchEventsFromTicketmaster(city);
    res.json(events);
})

export default router;