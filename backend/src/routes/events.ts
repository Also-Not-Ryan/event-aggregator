import { Router } from 'express';
import {fetchEventsFromTicketmaster } from '../services/ticketmaster.js';
import {fetchEventsFromPredictHQ} from '../services/predicthq.js';


const router = Router();

router.get('/', async (req, res) => {
    const city = req.query.city as string
    const [ticketmasterEvents, predictHQEvents] = await Promise.all([
        fetchEventsFromTicketmaster(city),
        fetchEventsFromPredictHQ(city)
    ]);
    const allEvents = [...ticketmasterEvents, ...predictHQEvents];
    res.json(allEvents);
})

export default router;