// user.controlerr.js file
const common = require('mocha/lib/interfaces/common');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require ('../models/user.js')
const Userbike =require ('../models/outfit.js')
const commonControler = require('../controlerr/common.controler');
const request = require('request');
const { has } = require('config');
const { use } = require('chai');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;;


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



async  loginapi(req, res) {
  const { email, password } = req.body;
  console.log("request", req.body);
  try {
    const user = await User.findOne({ email });
    console.log(user, "user");
    if (!user) {
      commonControler.errorMessage("User email not found", res);
    } else {
      const isPasswordValid = await bcrypt.compare(password == user.password);
      if (isPasswordValid) {
        const token = jwt.sign({ email, id: user.id }, process.env.SECRET_KEY);
        commonControler.successMessage(token, "Token generated successfully", res);
      } else {
        commonControler.errorMessage("Password is incorrect", res);
      }
  
    }
  } catch (error) {
    console.error("Error:", error);
    commonControler.errorMessage("An error occurred", res);
  }
}


async  userReg(req, res) {
  const{_id,money,buster,name,dailyReward,levels,shield}=req.body;
  console.log(req.body,"yes here")
  try{
    const sun=await User.findOne({
      _id
    })
    console.log(sun,"sundata here");
    if(sun){
      commonControler.errorMessage("unique id already exist",res)
    }
    else{
      const uid=commonControler.generateUniqueId (8)
      const adduser=await User.create({
        uniqueId:uid,money,buster,name,dailyReward,levels,shield
    
      })
      console.log(adduser,"adddkkkkk")
     commonControler.successMessage(adduser,"user reg successfully",res)
    }
  }catch(e){
    console.log(e);
    commonControler.errorMessage(`${e}`,res)
    
  }

}



async  updatelevels(req, res) {
const {uniqueId,levels}=req.body;
try{
  const user =await User.findOne({
   uniqueId
    
  })
  if(user){
   user.levels=levels
   await user.save(); 
    commonControler .successMessage(user,"user levels updated done",res)
  }
}catch(err){
  console.log("err",err);
  commonControler.errorMessage("occured err",res)
}

}

async updateBuster(req, res) {
  const { buster, uniqueId } = req.body;
  console.log(req.body, "reqjjj");
  try {
    const user = await User.findOne({ uniqueId });
    console.log(user, "user");
    console.log();
    if (user) {
      // update method 
      user.buster = buster; // Update the buster field in the user object
      await user.save(); // Save the changes to the database
    commonControler.successMessage(user, "User buster updated successfully", res);
    } else {
      commonControler.errorMessage("User not found", res);
    }
  } catch (err) {
    console.error(err);
    commonControler.errorMessage("An error occurred", res);
  }
}

// update shield
async updateshiled(req,res){
  const{uniqueId,shield}=req.body;
  try{
    const user=await User.findOne({
      uniqueId
    })
    if(user){
      user.shield=shield
      await user.save();
      commonControler.successMessage(user,"shild updated ",res)
    }

  }catch(err){
    commonControler.errorMessage("occured err",res)
  }
}

async addDailyReward(req, res) {
  const { money, addmoney, uniqueId } = req.body;
  console.log(typeof addmoney,"addmoney")
  try {
    const user = await User.findOne({ uniqueId });
    if (user) {
      user.money += addmoney; // Update the money field by adding addmoney
      await user.save(); // Save the updated user document
      console.log(user.money, "dh");
      commonControler.successMessage(user, "Money added successfully", res);
    } else {
      commonControler.error("User not found", res);
    }
  } catch (err) {
    console.error("Error:", err);
    commonControler.error("User not found", res);
  }
}

//  add user bike outfit
async addOutfit(req, res) {
  const {_id, selectOutfit, availbleOutfit } = req.body;

  try {
      // Find the user by id
      const user = await User.findOne({ _id });

      if (!user) {
          return commonControler.errorMessage("User not found", res);
      }

      // Find the user's bike by userId
      let userbike = await Userbike.findOne({ userId: user._id });

      if (userbike) {
          // Update the existing outfit
          userbike.selectOutfit = selectOutfit;
          userbike.availbleOutfit = availbleOutfit;
          await userbike.save();

          return commonControler.successMessage(userbike, "Outfit updated successfully", res);
      } else {
          // Create a new outfit
          userbike = await Userbike.create({
              userId: user._id,
              selectOutfit,
              availbleOutfit
          });

          return commonControler.successMessage(userbike, "Outfit added successfully", res);
      }
  } catch (err) {
      console.log('Error:', err);
      return commonControler.errorMessage("An error occurred", res);
  }
}

  
// uniqueid convert into email
async changemail(req, res) {
  const { uniqueId, email } = req.body;
  try {
    // Find the user by the uniqueId
    const user = await User.findOne({ uniqueId });
    if (!user) {
      // User not found, send an error message
      commonControler.errorMessage("User not found", res);
    } else {
      // Update the uniqueId to email
      user.uniqueId = email;
      // Save the updated user object
      await user.save();
      // Send a success message
      commonControler.successMessage(user, "Data updated successfully", res);
    }
  } catch (err) {
    // Handle any errors that occur
    commonControler.errorMessage("An error occurred", res);
  }
}


async  getDataWithObjId(req, res) {
  const { objectId } = req.body;
  if (!ObjectId.isValid(objectId)) {
    return commonControler.errorMessage("Invalid ObjectId format", res);
  }
  try {
    const user = await User.findById(objectId);
    console.log("user", user);
    if(!user){
      commonControler.errorMessage("user not found",res)
    }
   commonControler.successMessage(user, "get data", res);
  } catch (err) {
    console.error("Error occurred:", err); 
    commonControler.errorMessage("An error occurred", res);
  }
}



async  deleteUser(req, res) {
  const { _id } = req.body;
  try {
    if (!ObjectId.isValid(objectId)) {
      return commonControler.errorMessage("Invalid ObjectId format", res);
    }
    const user = await User.findByIdAndDelete(_id);
    console.log(typeof user);
  if(user){
    commonControler.successMessage(null,"user delte succefully",res )
  }else{
    commonControler.errorMessage("user not found",res)
  }
  } catch (err) {
    console.error("Error occurred:", err); 
    commonControler.errorMessage("An error occurred", res); 
}
}

// get all data from user
async getdata(req,res){
  try{
   const user = await User.find()
    commonControler.successMessage(user,"get data",res)
  }catch(err){
    commonControler.errorMessage("occured error",res)
  }
}


// left join 
  async  lookupjoin(req, res) {
    const { uniqueId } = req.body;
    try {
      const usersWithBikes = await User.aggregate([
        {
          $match: { uniqueId } // Match the specific user by uniqueId
        },
        {
          $lookup: {
            from: 'userbikes',
            localField: 'uniqueId',
            foreignField: 'userId',
            as: 'userBikes'
          }
        },
        // {
        //   $project: {
        //     _id: 1,
        //     uniqueId: 1,
        //     userBikes: {
        //       userId: 1,  
        //       selectOutfit: 1,
        //       availbleOutfit: 1,
              
        //     }
        //   }
        // }
      ]);

      if (usersWithBikes.length > 0) {
        res.status(200).json({ message: 'Data retrieved successfully', data: usersWithBikes[0] });
      } else {
        commonControler.errorMessage("user not found",res)
      }
    } catch (error) {
      commonControler.errorMessage("occured error",res)
    }
  }

  // get all users
 // get all users
async getusers(req, res) {
  try {
      const users = await User.find({});
      commonControler.successMessage(users, "get data", res);
  } catch (err) {
      console.log(err, "Err");
      commonControler.errorMessage("occurred error", res);
  }
}

// delete  fetch data from users table and userbike table 
async deldata(req, res) {
  const { _id } = req.body;
  try {
      // Find the user by id
      const user = await User.findById(_id);
      if (!user) {
          return commonControler.errorMessage("User not found", res);s
      }

      // Find the user's bike by userId
      const userbike = await Userbike.findOne({ userId: user._id });
      if (user && userbike) {
          // Delete the user's bike
          await Userbike.findByIdAndDelete(userbike._id);
          // Delete the user
          await User.findByIdAndDelete(user._id);
          return commonControler.successMessage({}, "user and userbikes table data delete successfully", res);
      } else {
        commonControler.errorMessage("user bike data not found",res)
      }
  } catch (err) {
      console.log("Error:", err);
      return commonControler.errorMessage("Occurred error", res);
  }
}

  }






module.exports = UserController;
