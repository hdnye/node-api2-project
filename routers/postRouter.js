// import express
const express = require('express');

//create Router 
const router = express.Router();

// add server endpoints
router.get('/', (req, res) => {
    if(!posts) {
        res.status(500).json({
            message: "There was an error while saving the comment to the database",
        })
    } else {
        res.status(200).json(posts);
    }
    posts.find()
})

//export router using Common JS
module.exports = router;