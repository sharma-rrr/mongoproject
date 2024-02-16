// user.controlerr.js file
const common = require('mocha/lib/interfaces/common');
const User = require('../models/user');
const CommonController=require ('../controlerr/common.controler')
class UserController {
  // API endpoint to add a user
  async addUser(req, res) {
    try {
      const { email, password, fname, lname } = req.body;
      console.log(req.body,"__________************___________")
      const newUser = new User({ email, password, fname, lname });
      console.log(newUser,"******___________")
      const savedUser = await newUser.save();
      console.log(savedUser,"svdghja")
      res.status(201).json(savedUser);
    } catch (error) {
        CommonController.error("occuerd error",res)
    }
  }

  //
  async login(req,res){
    const{email,password}=req.body;
    try{

    }catch(error){
        res.status(400).json({ error: error.message });
       CommonController.error("dbfhhf",res)
    }

  }






}
module.exports = UserController;
