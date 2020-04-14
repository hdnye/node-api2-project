const express = require('express');
const postRouter = require('./routers/postRouter');
const commentRouter = require('./routers/commentRouter');

const server = express();
const port = 5500;

//Middleware
server.use(express.json());

//merge sub-app(postRouter) into main app
server.use('/posts', postRouter);
server.use('/comments', commentRouter);

server.use('/', (req, res) => {
    res.status(200).send('Hello from express app running');
});


server.listen(port, () => {
    console.log(`server listening at http://localhost:${port}`);
});