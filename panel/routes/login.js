const express = require('express');
const querystring = require('querystring');
const { client_id, redirect_uri, generateRandomString } = require('../modules/spotifyAuth');
const router = express.Router();

//Spotify login
router.get('/', (req, res) => {
    const state = generateRandomString(16);
    const scope = 'user-read-private user-read-email user-read-playback-state';

    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        })
    );
});

module.exports = router;