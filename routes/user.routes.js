// user.routes.js file
const express = require('express');
const usercontroller = require('../controlerr/user.controlerr');
const router = express.Router();

// Create an instance of the UserController class
const controllerInstance = new usercontroller();

// Set up the route to add a user
// user reg
router.post('/userReg', controllerInstance.userReg);
// update level
router.post('/updatelevel', controllerInstance.updatelevels);
// update user buster
router.post('/updatebuster', controllerInstance.updateBuster);
// update shild
router.post('/updateshild', controllerInstance.updateshiled);
// adddaily reward
router.post('/addrewrd', controllerInstance.addDailyReward);
// add userbike outfit
router.post('/userOutFit', controllerInstance.addOutfit);
// unique id convert into email
router.post('/change', controllerInstance.changemail);
// get data by objectid
router.post('/getdata', controllerInstance.getDataWithObjId);
// delete users
router.post('/deleteuser', controllerInstance.deleteUser);

// get all data
router.post('/data', controllerInstance.getdata);

// lookup join as leftjoin
router.post('/lookup', controllerInstance.lookupjoin);


// get data from users tables

router.post('/aa',controllerInstance.getusers);

// delete  fetch data from users table and userbike table 
router.post('/deletedata',controllerInstance.deldata);


// array of string
router.post('/arrstring',controllerInstance.arrstring);

// update arrstring

router.post('/updatestr',controllerInstance.updatestr);

// update artray of string data
router.post('/updatearrayofstring',controllerInstance.updatearrayofstring);

// push arraystring daTa
router.post('/pushdatastr',controllerInstance.pushdatastr);
 


// add array of number
router.post('/arrofnum ',controllerInstance.arrayofnumber);
// update array of number
router.post('/updatearrnum',controllerInstance.updatearrnum);
// push data in array of number
router.post('/pushdata',controllerInstance.pushdata);
// array of object 
router.post('/arrofobj',controllerInstance.addarrofobj);
// update arr of object
router.post('/updatearrobj',controllerInstance.updatearrobj);

// array of object in push data
router.post('/pushdataaa',controllerInstance.pushdataarrofobj);

//add data parents
router.post('/addparents',controllerInstance.addParentsData);




















// login api
router.post('/addUser', controllerInstance.addUser);
router.post('/login',controllerInstance.login)
// update data
router.post('/update',controllerInstance.update)
// add data from parents table
router.post('/adddata',controllerInstance.adddetails)
//
router.post('/loginapi',controllerInstance.loginapi)

module.exports = router;
 
