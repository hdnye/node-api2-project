// import express
const express = require('express');

//create  express Router 
const router = express.Router();

//import data file
const db = require('../data/db.js');

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
    // If the post with the specified id is not found:
            } else {
                res.status(404).json({
                    message: 'The post with the specified ID does not exist.',
                })
            }
       })
})
// CREATE new post
router.post('/', (req, res) => {
    // If the request body is missing the title or contents property:
    if(!req.body.title || !req.body.contents) {
       return res.status(400).json({
           message: "Please provide title and contents for the post.",
       })     
    }
    // If the information about the post is valid: 
      const newPost = db.insert({
          title: req.body.title,
          contents: req.body.contents
       })
       res.status(201).json(newPost)
        console.log(newPost)
    // If there's an error while saving the post:   
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "There was an error while saving the post to the database",
            })
        })
})

// UPDATE the post by id
router.put('/:id', (req, res) => {
   //If the request body is missing the title or contents property:
    if(!req.body.title || !req.body.contents) {
        return res.status(404).json({
            message: 'Please provide title and contents for the post.',
        })
    }
   // If the post is found and the new information is valid:
   db.update(req.params.id, req.body)
    .then((post) => {
        if(post) {
        res.status(200).json(post)
    // If the post with the specified id is not found:        
    } else {
        res.status(404).json({
            message: 'The post with the specified ID does not exist.',
     })
     // If there's an error when updating the post:
     .catch((err) => {
         console.log(error)
         res.status(500).json({
             message: 'The post information could not be modified.',
         })
     })
   } 
 })
})

//CREATE a comment for the post with a specific id using info sent inside a req body
router.post('/:id/comments', (req, res) => {
    console.log('Here')
    // If the request body is missing the text property:
    if(!req.body.text) {
        res.status(400).json({
            message: 'Please provide text for the comment.',
        })
     }
    // If the information about the comment is valid:
    // db.insertComment({...req.body, post_id: req.params.id}) <- this also works
    db.insertComment(req.params.id)
        .then((comments) => {
            console.log(comments)
            if(comments) {    
                res.status(201).json(comments)       
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
// DELETE post by id
router.delete('/:id', (req, res) => {
    // If the post with the specified id is not found:
    if(!req.params.id) {
        res.status(404).json({
            message: 'The post with the specified ID does not exist.',
        })
      }
    db.remove(req.params.id) 
        .then((post) => {
            if(post) {
                res.status(200).json({
                    message: 'This Post has been removed.',
                })
    // If there's an error in removing the post from the database:    
            }  else {
                res.status(500).json({
                    message: 'The post could not be removed.',
                })
            }
        })  
})

//export file
module.exports = router;













