// import express
const express = require('express');

//create Router 
const router = express.Router();

//import data file
const db = require('../data/db.js');

// Add server endpoints

// GET comments associated with the post w/ a specific id
router.get('/:id/posts/:postId/', (req, res) => {
    // const postsId = req.params.postId;
    // const comment = db.findPostComments(postsId)
    // If the post with the specified id is not found
    //  if(!req.params.postId) {
    //      res.status(404).json({
    //          message: 'The post with the specified id does not exist'
    //      })
    //  }
     db.findPostComments(req.params.id, req.params.postId) 
          .then((comment) => {
              console.log(comment)
              if(comment)  {
                res.json(comment)
            } else {
                res.status(404).json({
                      message: 'The post with the specified id does not exist'
               })
            }
        }) 
    // If there's an error in retrieving the comments from the database
            // } else {
              .catch((error) => { 
                  console.log(error)  
                res.status(500).json({
                    message: 'The comments information could not be retrieved.',
               })
         })   
  })

// GET comments by id
router.get('/:id', (req, res) => {
     db.findCommentById(req.params.id) 
        .then((comment) => {
            if(comment) {
                res.json(comment)
     // If the post with the specified id is not found:
            } else {
                res.status(404).json({
                    message: 'The post with the specified ID does not exist.',
                })
            }
        })
    // If there's an error in retrieving the comments from the database:
        .catch((error) => {
            console.log(error)
            res.status(500).json({
              message: 'The comments information could not be retrieved.',
        })
    })
 })  



//export router using Common JS
module.exports = router;