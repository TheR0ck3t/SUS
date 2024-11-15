const express = require('express');
const router = express.Router();
const db = require('../modules/db');

router.get('/', async(req, res) => {
    try {
        db_result = await db.any('SELECT * FROM public.cum');
        res.json(db_result);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Could not fetch from the database.' });
    }
});

module.exports = router;