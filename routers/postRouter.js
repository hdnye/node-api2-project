// import express
const express = require('express');

//create  express Router 
const router = express.Router();

//import data file
const db = require('./data/db.js');

server.use('/routers/postRouter');

// add server endpoints

// GET posts
router.get('/', (req, res) => {
    // options supported by .find method
    // received from query string & passed through
  const options = {
      // query string names are CASE SENSITIVE
      sortBy: req.query.sortBy,
      limit: req.query.limit,
  }
    db.find(options)
        .then((db) => {   
           res.status(200).json(db);
    })
    .catch((error) => {
        console.log(error)
            res.status(500).json({
                message: "The post information could not be retrieved." ,
            })
    })
});
// GET /posts/:id
router.get('/:id', (req, res) => {
    db.findById(req.params.id)
        .then((post) => {
            if(post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({
                    message: 'The post with the specified ID does not exist.',
                })
            }
       })
})
// CREATE new post
router.post('/', (req, res) => {
    if(!req.body.name || req.body.content) {
       return res.status(400).json({
           message: "Please provide title and contents for the post.",
       })     
    }
    const newPost = db.insert({
         title: req.body.name,
         content: req.body.content
     })
     db.add(newPost)
        .then((post) => {
            res.status(201).json(post)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "There was an error while saving the post to the database",
            })
        })

})
//export file
module.exports = router;














//export router using Common JS
module.exports = router;