const express = require('express');
const router = express.Router();
const db = require('../modules/db');

// Example Database Interaction
router.post('/', async(req, res) => {
    const { meow } = req.body;
    try {
        const result = await db.one(`INSERT INTO public.cum(nazwa) VALUES ($1) RETURNING *;`, [meow]);
        res.status(201).json(result);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Could not save to the database.' });
    }
});

module.exports = router;