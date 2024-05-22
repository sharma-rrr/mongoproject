// user.routes.js file
const express = require('express');
const usercontroller = require('../controlerr/user.controlerr');
const router = express.Router();

// Create an instance of the UserController class
const controllerInstance = new usercontroller();

// Set up the route to add a user
router.post('/userReg', controllerInstance.userReg);
router.post('/updatelevel', controllerInstance.updatelevels);
router.post('/updatebuster', controllerInstance.updateBuster);
router.post('/updateshild', controllerInstance.updateshiled);
router.post('/addrewrd', controllerInstance.addDailyReward);
// add userbike outfit
router.post('/userOutFit', controllerInstance.addOutfit);
// unique id convert into email
router.post('/change', controllerInstance.changemail);
// get data with objectid
router.post('/getdata', controllerInstance.getDataWithObjId);
// delete users
router.post('/deleteuser', controllerInstance.deleteUser);

// get all data
router.post('/data', controllerInstance.getdata);

// lookup join as leftjoin
router.post('/lookup', controllerInstance.lookupjoin);

// syntax of lookup
// db.orders.aggregate( [
//     {
//       $lookup:
//         {
//           from: "inventory",
//           localField: "item",
//           foreignField: "sku",
//           as: "inventory_docs"
//         }
//    }
//  ] )












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
 
