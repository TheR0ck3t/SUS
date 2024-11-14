const express = require('express');
const axios = require('axios');
const { refreshTokenIfExpired } = require('../modules/spotifyAuth');
const router = express.Router();

// Fetch currently playing Spotify song
router.get('/', refreshTokenIfExpired, async(req, res) => {
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
        console.error('Error fetching Spotify data:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Error fetching Spotify data' });
    }
});

module.exports = router;