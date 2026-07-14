import 'dotenv/config'
import express from 'express';
import eventRoutes from './routes/events.js';
import authRoutes from './routes/auth.js'
import calendarRoutes from './routes/calendar.js'

import cors from 'cors'


const app = express();

app.get("/", (req, res) => {
    res.send("Hello");
});

app.use(cors())
app.use('/auth', authRoutes)
app.use('/events', eventRoutes);
app.use('/calendar', calendarRoutes)
const PORT = 3000;



app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});