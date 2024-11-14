// spotifyAuth.js
const crypto = require('crypto');
const axios = require('axios');
const querystring = require('querystring');

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = 'http://localhost:6969/callback';

function generateRandomString(length) {
    return crypto.randomBytes(length).toString('hex');
}

async function refreshTokenIfExpired(req, res, next) {
    const tokenTimestamp = req.cookies.tokenTimestamp;
    const now = Date.now();

    if (tokenTimestamp && now - tokenTimestamp < 600000) {
        return next();
    }

    try {
        const refresh_token = req.cookies.refresh_token;
        if (!refresh_token) {
            throw new Error("Refresh token is missing.");
        }

        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            data: querystring.stringify({
                grant_type: 'refresh_token',
                refresh_token: refresh_token,
            }),
            headers: {
                'Authorization': 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const response = await axios.post(authOptions.url, authOptions.data, { headers: authOptions.headers });
        const access_token = response.data.access_token;

        // Set new access token and timestamp in cookies
        res.cookie('spotify_access_token', access_token, { httpOnly: true, secure: true });
        res.cookie('tokenTimestamp', now, { httpOnly: true, secure: true });

        next();
    } catch (error) {
        console.error('Error refreshing access token:', error.response ? error.response.data : error.message);
        res.redirect('/login');
    }
}

module.exports = {
    client_id,
    client_secret,
    redirect_uri,
    generateRandomString,
    refreshTokenIfExpired
};