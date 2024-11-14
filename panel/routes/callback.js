const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const { client_id, client_secret, redirect_uri } = require('../modules/spotifyAuth');
const router = express.Router();


// Spotify callback
router.get('/', async(req, res) => {
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
                'Authorization': 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const tokenResponse = await axios.post(authOptions.url, authOptions.data, { headers: authOptions.headers });
        const access_token = tokenResponse.data.access_token;
        const refresh_token = tokenResponse.data.refresh_token;

        // Store tokens and timestamp in cookies
        const now = Date.now();
        res.cookie('spotify_access_token', access_token, { httpOnly: true, secure: true });
        res.cookie('refresh_token', refresh_token, { httpOnly: true, secure: true });
        res.cookie('tokenTimestamp', now, { httpOnly: true, secure: true });

        res.redirect('/');
    } catch (error) {
        console.error('Error fetching access token:', error.response ? error.response.data : error.message);
        res.redirect('/?error=invalid_token');
    }
});

module.exports = router;