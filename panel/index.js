require('dotenv').config({ path: 'panel/.env' });
const axios = require('axios');
const express = require('express');
const path = require('path');
const pgp = require('pg-promise')();
const querystring = require('querystring');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT;

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
app.use(cookieParser());

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/index.html'));
});

// Baaza danych
app.post('/meow', async(req, res) => {
    const { meow } = req.body;
    try {
        const result = await db.one(`INSERT INTO public.cum(nazwa) VALUES ($1) RETURNING *;`, [meow]);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not save to the database.' });
    }
});

// Nbp
app.get('/nbp', async(req, res) => {
    try {
        const [resultA, resultB] = await Promise.all([
            axios.get('http://api.nbp.pl/api/exchangerates/tables/A?format=json'),
            axios.get('http://api.nbp.pl/api/exchangerates/tables/B?format=json')
        ]);

        const result = [
            ...resultA.data[0].rates,
            ...resultB.data[0].rates
        ];

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not fetch data from NBP API.' });
    }
});


// Spotify Client Details
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = 'http://localhost:6969/callback';

function generateRandomString(length) {
    return crypto.randomBytes(length).toString('hex');
}

// Spotify login route
app.get('/login', (req, res) => {
    const state = generateRandomString(16);
    const scope = 'user-read-private user-read-email user-read-playback-state';

    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
});

// Spotify callback route
app.get('/callback', async(req, res) => {
    const code = req.query.code || null;
    const state = req.query.state || null;

    if (!code || !state) {
        return res.redirect('/?error=state_mismatch');
    }

    try {
        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            data: querystring.stringify({
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            }),
            headers: {
                'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const tokenResponse = await axios.post(authOptions.url, authOptions.data, { headers: authOptions.headers });
        const access_token = tokenResponse.data.access_token;

        res.cookie('spotify_access_token', access_token, { httpOnly: true, secure: true });
        res.redirect('/');
    } catch (error) {
        console.error('Error fetching access token:', error);
        res.redirect('/?error=invalid_token');
    }
});

// Spotify data route
app.get('/spotify', async(req, res) => {
    const access_token = req.cookies.spotify_access_token;

    if (!access_token) {
        return res.status(401).json({ error: 'No access token available' });
    }

    try {
        const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing?market=PL', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching Spotify data:', error);
        res.status(500).json({ error: 'Error fetching Spotify data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});