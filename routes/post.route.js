const express = require('express');
const router = express.Router();

//Require the controllers 
const post_controller = require('../controllers/post.controller');

module.exports = router; 


router.post('/create',post_controller.post_create); //create
router.get('/:id',post_controller.post_details); //read
router.put('/:id/update', post_controller.post_update); //update
router.delete('/:id/delete', post_controller.post_delete); //delete
