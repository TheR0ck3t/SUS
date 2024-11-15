require('dotenv').config({ path: 'panel/.env' });
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT;


// App configuration
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '.public')));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '.public/cdn')));


// Routes
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/index.html'));
});
const callbackRoute = require('./routes/callback');
const spotifyLoginRoute = require('./routes/spotifyLogin');
const spotifyRoute = require('./routes/spotify');
const nbpRoute = require('./routes/nbp');
const meowRoute = require('./routes/meow');
const arfRoute = require('./routes/arf');
const authRegisterRoute = require('./routes/auth/register');
const authLoginRoute = require('./routes/auth/login');

app.use('/callback', callbackRoute);
app.use('/spotifyLogin', spotifyLoginRoute);
app.use('/spotify', spotifyRoute);
app.use('/nbp', nbpRoute);
app.use('/meow', meowRoute);
app.use('/arf', arfRoute);
app.use('/auth/register', authRegisterRoute);
app.use('/auth/login', authLoginRoute);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});