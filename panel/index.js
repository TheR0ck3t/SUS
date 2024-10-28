require('dotenv').config({ path: 'panel/.env' });
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

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));

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
app.listen(PORT, () => {
    console.log(`cumming on port ${PORT}`)
});