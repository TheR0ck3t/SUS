// Include the HTTP module
//const http = require('http');

// Set the port to 3000
//const PORT = 3000;

// 1. Process incoming requests (req), reply with response (res)
//const requestHandler = (req, res) => {

//    res.writeHead(200, { 'Content-Type': 'text/plain' });
//    res.end('hello world \ penis');
//}

// 2. Create a server with the requestHandler
//const server = http.createServer(requestHandler);

// 3. Start listening for incoming requests on port
//server.listen(PORT, () => {
//    console.log(`cumming on port ${PORT}`)
//})

const express = require('express');
const app = express();
const PORT = 3000;
app.listen(PORT);
app.get('/', (req, res) => {
    res.sendFile('./panel/index.html');
})