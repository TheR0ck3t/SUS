const express = require('express');
const router = express.Router();
const db = require('../../modules/db');

const { comparePasswords } = require('../../modules/userAuth');

router.post('/', async(req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Missing username or password' });
    }
    try {
        const user = await db.oneOrNone('SELECT * FROM public.users WHERE username = $1', [username]);
        if (!user) {
            return res.status(400).json({ error: 'User not found or password is incorrect' });
        }

        const isMatch = await comparePasswords(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'User not found or password is incorrect' });
        }

        res.status(200).json({ result: 'Logged in' });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Could not fetch from the database.' });
    }
})

module.exports = router;