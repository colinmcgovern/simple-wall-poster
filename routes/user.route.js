const express = require('express');
const router = express.Router();

//Require the controllers 
const user_controller = require('../controllers/user.controller');

module.exports = router; 

router.post('/create',user_controller.user_create); //create
router.get('/:token',user_controller.user_details); //read 
router.put('/:id/update', user_controller.user_update); //update
router.delete('/:id/delete', user_controller.user_delete); //delete