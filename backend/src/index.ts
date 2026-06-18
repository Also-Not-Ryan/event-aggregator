import express from 'express';
import eventRoutes from './routes/events.js';
import 'dotenv/config'

const app = express();

app.get("/", (req, res) => {
    res.send("Hello");
});

app.use('/events', eventRoutes);

const PORT = 3000;



app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});