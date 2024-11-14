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


// Routes
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/index.html'));
});
const callbackRoute = require('./routes/callback');
const loginRoute = require('./routes/login');
const spotifyRoute = require('./routes/spotify');
const nbpRoute = require('./routes/nbp');
const meowRoute = require('./routes/meow');

app.use('/callback', callbackRoute);
app.use('/login', loginRoute);
app.use('/spotify', spotifyRoute);
app.use('/nbp', nbpRoute);
app.use('/meow', meowRoute);




// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});