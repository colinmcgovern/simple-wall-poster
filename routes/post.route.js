const express = require('express');
const router = express.Router();

//Require the controllers 
const post_controller = require('../controllers/post.controller');

module.exports = router; 

router.post('/create',post_controller.product_create); //create
router.get('/:id',post_controller.product_details); //read 
router.put('/:id/update', post_controller.product_update); //update
router.delete('/:id/delete', post_controller.product_delete); //delete