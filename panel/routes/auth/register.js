const express = require('express');
const router = express.Router();
const db = require('../../modules/db');

const { hashPassword } = require('../../modules/userAuth');

router.post('/', async(req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Missing username or password' });
    }
    try {
        const hashedPassword = await hashPassword(password);

        const result = await db.one(`INSERT INTO public.users(username, password) VALUES ($1, $2) RETURNING *;`, [username, hashedPassword]);
        res.status(200).json({ result: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
})

module.exports = router;