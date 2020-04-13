const express = require('express');
const server = express();

server.use('/', (req, res) => {
    res.status(200).send('Hello from express app running');
});

server.listen(8000, () => {
    console.log('server listening on port 8000');
});