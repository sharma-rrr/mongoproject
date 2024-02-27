// user.routes.js file
const express = require('express');
const usercontroller = require('../controlerr/user.controlerr');
const router = express.Router();

// Create an instance of the UserController class
const controllerInstance = new usercontroller();

// Set up the route to add a user
router.post('/addUser', controllerInstance.addUser);
// login api
router.post('/login',controllerInstance.login)

// update data
router.post('/update',controllerInstance.update)

// add data from parents table
router.post('/adddata',controllerInstance.adddetails)

module.exports = router;
 
