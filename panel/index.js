require('dotenv').config({ path: 'panel/.env' });
const axios = require('axios');
const express = require('express');
const app = express();
const PORT = process.env.port;
const path = require('path');
const pgp = require('pg-promise')();

const db = pgp({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/index.html'));

});

app.post('/meow', async(req, res) => {
    const { cum } = req.body;
    try {
        const result = await db.one(`INSERT INTO public.cum(nazwa) VALUES ('${cum}') RETURNING *;`, [cum]);
        console.log(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not save to the database.' });
    }
})

// Spotify API route
app.get('/spotify', async(req, res) => {
    try {
        const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing?market=PL', {
            headers: { Authorization: 'Bearer BQAoR9R24UV845Mvrp4tpxDIevQtnOwCrLNV5HVJZ9ChBsBwVevLD24QfrOGjFoAgzN8cQ08Uj93EiSUM4uhUB5w0yL73BXtATlK840EIOO6Jw2shpM' } // Replace 'tokenid' with your actual token
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching Spotify data:', error);
        res.status(500).json({ error: 'Error fetching Spotify data' });
    }
});

app.listen(PORT, () => {
    console.log(`cumming on port ${PORT}`)
});