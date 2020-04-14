// import express
const express = require('express');

//create Router 
const router = express.Router();

//import data file
const db = require('../data/db.js');

// Add server endpoints

// GET comments associated with the post w/ a specific id
router.get('/:postId', (req, res) => {
    db.findPostComments(req.params.postId)
        .then((comment) => {
            if(comment)  {
                res.json(comment)
    // If the post with the specified id is not found
            } else {
                res.status(404).json({
                    message: 'The post with the specified id does not exist.',
                })
            }
        })
    //If there's an error in retrieving the comments from the database
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

//CREATE a comment for the post with a specific id using info sent inside a req body
router.post('/:id', (req, res) => {
    //If the request body is missing the text property:
    if(!req.body.text) {
        res.status(400).json({
            message: 'Please provide text for the comment.',
        })
     }
     db.insertComment(req.params.id, req.params.postId) 
        .then((comment) => {
            if(comment) {    
                res.status(201).json(comment)             
    // If the post with the specified id is not found:
            } else {
                res.status(404).json({
                    message: 'The post with the specified ID does not exist.',
                })
            }
        })
    // If there's an error while saving the comment:    
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: 'There was an error while saving the comment to the database.',
            })

        })
})

//export router using Common JS
module.exports = router;