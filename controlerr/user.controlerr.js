// user.controlerr.js file
const common = require('mocha/lib/interfaces/common');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const  parents=require('../models/part')
const CommonController=require ('../controlerr/common.controler');
const commonControler = require('../controlerr/common.controler');
const request = require('request');
const { has } = require('config');


class UserController {
  // API endpoint to add a user
 
 // add data 
 async addUser(req, res) {
  const { email, lname, fname, password } = req.body;
  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      commonControler.errorMessage("Email already exists", res);
    } else {
      const hashedPassword = await commonControler.hashPassword(password);
      const newUser = await User.create({
        email,
        fname,
        lname,
        password: hashedPassword,
      });

      commonControler.successMessage(newUser, "Data added successfully", res);
    }
  } catch (err) {
    console.error(err);
    commonControler.errorMessage("An error occurred", res);
  }
}
   

  // login
  async login(req, res) {
      const { email, password } = req.body;
  
      try {
          const user = await User.findOne({ email });
  
          if (user) {
              const isPasswordValid = await bcrypt.compare(password, user.password);
  
              if (isPasswordValid) {
                  const token = jwt.sign({ email }, process.env.SECRET_KEY);
                  commonControler.successMessage(token, "Token created", res);
              } else {
                  commonControler.errorMessage("Invalid password", res);
              }
          } else {
              commonControler.errorMessage("User not found", res);
          }
      } catch (error) {
          console.error(error);
          commonControler.errorMessage("An error occurred", res);
      }
  }
  


async update(req,res){
const{email,lname,fname}=req.body;
console.log(req.body,"dghjhdjsk")
try{
const sun=await User.findOne({
    email
})
 if(sun){
  await sun.update({
    lname,fname
  })
  commonControler.successMessage(sun,"update data sucefully",res)
 }else{
   commonControler.errorMessage("email not exist",res)
 }

}catch(error){
commonControler.errorMessage("occuerde error",res)
}
}

// add data
async  adddetails(req, res) {
  const { email, mothername, fathername,adress } = req.body;
  console.log(req.body, "Request Body");
  try {
    const user = await User.findOne({ email });
    console.log(user, "User");
    if (!user) {
      commonControler.errorMessage("user not exist", res);
    return;
    }
   
    const parent = await parents.findOne({ userid: user.id });
    console.log(parent,"*************&*&**&*&*&*")
    if (parent) {
      await parent.update({ mothername, fathername, adress, userid: user.id });
      commonControler.successMessage(parent, "Parent updated successfully", res);
    } else {
      const newParent = await parents.create({ mothername, fathername, adress,userid: user.id });
      commonControler.successMessage(newParent, "Parent created successfully", res);
      console.log(newParent,"newparents............")
    }
  } catch (err) {
    console.error("Error:", err.message);
    commonControler.errorMessage("An error occurred", res);
  }
  
}



}
module.exports = UserController;
