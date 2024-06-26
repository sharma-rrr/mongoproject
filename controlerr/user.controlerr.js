// user.controlerr.js file
const common = require('mocha/lib/interfaces/common');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require ('../models/user.js')
const parent =require ('../models/parents.js')
const Userbike =require ('../models/outfit.js')
const commonControler = require('../controlerr/common.controler');
const request = require('request');
const { has } = require('config');
const { use } = require('chai');
const mongoose = require('mongoose');
const saveSubdocs = require('mongoose/lib/plugins/saveSubdocs.js');
const { log } = require('async');
const { ObjectId } = mongoose.Types;


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
  

// update  data
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


// update levels
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


// lookup join
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
      {
        $lookup: {
          from: 'parents',
          localField: 'uniqueId',
          foreignField: 'userId',
          as: 'parents'
        }
      }
    ]);

    if (usersWithBikes.length > 0) {
      res.status(200).json({ message: 'Data retrieved successfully', data: usersWithBikes[0] });
    } else {
      commonControler.errorMessage("User not found", res);
    }
  } catch (error) {
    console.error("Error occurred:", error);
    commonControler.errorMessage("An error occurred while retrieving data", res);
  }
}





 // get all users
async getusers(req, res) {
  try {
      const users = await User.find({});
      commonControler.successMessage(users, "get data", res);
  }catch (err) {
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

// array string
async  arrstring(req, res) {
  try {
    const cars = ["Saab", "Volvo", "BMW"];
    const users = await User.create({
      name: cars
    });
    commonControler.successMessage(users, "add data", res);
  } catch (err) {
    console.log(err, "err");
    commonControler.errorMessage('occurred err', res);
  }
}

// update string used with map fution
async  updatestr(req, res) {
  const { name, _id, link } = req.body;

  try {
    const user = await User.findById(_id);

    if (!user) {
      return commonControler.errorMessage("User not found", res);
    }

    console.log('User found:', user);
 // Check if the name matches "saab" (case-insensitive)
    const updatedNames = user.name.map(name => name.toLowerCase() === "rr" ? "ss" : name);
    // Update the user's name array
    user.name = updatedNames;

    await user.save();
    console.log('User updated:', user);

    return commonControler.successMessage(user, "User updated successfully", res);
  } catch (err) {
    console.error('Error occurred:', err);
    return commonControler.errorMessage("An error occurred", res);
  }
}

// update data
async  updatearrayofstring(req, res) {
  const { _id, name, link, newname } = req.body;
  try {
    const user = await User.findById(_id);
    console.log(typeof user.name);

    if (!user) {
      return commonControler.errorMessage("User not found", res);
    }
 
    let arr = [];
    console.log(user.name,"name");
    for (let i = 0; i < user.name.length; i++) {
      // console.log(user.name[i], "here name data");
      if (user.name[i] === newname) {
        console.log("Yes, name found:", newname);
        arr.push(link);
      }else{
        arr.push(user.name[i])
      }
    }
    console.log(arr,"arrrrrrr");
     user.name = arr
    await user.save()
    commonControler.successMessage(user,"aaa",res)
  } catch (err) {
    console.error('Error occurred:', err); 
    return commonControler.errorMessage("An error occurred", res);
  }
}

// pushdata array string
async pushdatastr(req, res) {
  const { name, _id } = req.body;
  console.log(req.body, "rrrttr");
  try {
      const user = await User.findById(_id);
      console.log("Ddff", user);
      if (!user) {
          commonControler.errorMessage("user not found", res);
      } else {
          // Push the 'name' property from the request body into the 'user' array
          user.name.push(name);
          await user.save(); 
          res.status(200).json(user); 
      }
  } catch (err) {
      console.log("err", err);
      commonControler.errorMessage("an error occurred", res);
  }
}



//  add arr number
async arrayofnumber(req,res){
    try{
      const arrnum =[1,2,3,4,5,6,7]
      console.log(typeof arrnum,"hsghg");
      const type =JSON.stringify(arrnum)
      const user =await User.create({
        name:type
      })
     commonControler.successMessage(user,"data add ",res)
    }catch(err){
      commonControler.errorMessage("occured err",res)
    }
}

// updatearr num
async updatearrnum(req, res) {
    const { _id, newname, valueupdate } = req.body;
    try {
      const user = await User.findById(_id);
      console.log(user, "userdata_______");
      if (!user) {
        return commonControler.errorMessage("user not found", res);
      }

      console.log(user.name, "Original user.name");
  
      let arr = JSON.parse(user.name);
  
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === newname) {  
          console.log("yes");
          arr[i] = valueupdate;
          console.log("updated value");
        }
      }
      user.name = JSON.stringify(arr);
      await user.save();
      console.log("data", user);
      commonControler.successMessage(user, "data updated", res);
    } catch (err) {
      console.error(err); 
      commonControler.errorMessage("occurred error", res);
    }
  }
  
  // data add
       async pushdata(req,res){
        const {name,_id}=req.body;
        try{
          const  user =await User.findById({
            _id
          })
          console.log(typeof user)
          if(!user){
            commonControler.errorMessage("user not found",res)
          }

       const type =JSON.parse(user.name)
       for (let i = 0; i < type.length; i++) {
        console.log(type[i],"dd");
       }
       type.push(name)
       console.log(type,"sss");
        user.name =JSON.stringify(type)
        await user.save();
        commonControler.successMessage(user,"data add successfully",res)
        }catch(err){
          commonControler.errorMessage("occured err",res)
        }

       }


        // add arr of obj
       async addarrofobj(req,res){
        const{name}=req.body;
        try{
          var array = [
            { name:"string 1", value:"this", other: "that" },
            { name:"string 2", value:"this", other: "that" }
        ];
        console.log(typeof array);
      const user = await User.create({
       name:JSON.stringify(array)
      })
        commonControler.successMessage(user,"data add ",res)
        }catch(err){
          commonControler.errorMessage("occured err",res)
        }
       }



       // update array of object
       async updatearrobj(req,res){
        const {_id,name,newlink,other,value}=req.body;
        try{
          const user =await User.findById({
            _id
          })
          const x=JSON.parse(user.name)
          for (let i = 0; i < x.length; i++) {
            console.log(x[i], "????");
            if(x[i].name === name){
              console.log("yes");
              x[i].name = newlink
              console.log("no")
              break;
             }else if(x[i].other === other){
              x[i].other = newlink
              break;
             }else if(x[i].value === value){
              x[i].value = newlink
              break;
             }
          
          }
          console.log(x,"xdata");
          user.name =JSON.stringify(x)
          await user.save();
          commonControler.successMessage(user,"data updated ",res)
        }catch(err){
          commonControler.errorMessage("occured err",res)
        }
       }
       
       
       // push data array of
      // push data to array of object
      async pushdataarrofobj(req, res) {
        const { _id, name,other } = req.body;
        try {
          const sun = await User.findById(_id);
          if (!sun) {
            return commonControler.errorMessage("user not found", res);
          }
          const bb =JSON.parse(sun.name)
          for (let i = 0; i < bb.length; i++) {
            console.log([i],"dd");
          }
          bb.push({name,other})
          console.log(bb,"data");
             // Reassign the modified array back to sun.name
        sun.name = JSON.stringify(bb);

        // Save the updated document
        await sun.save();

          return res.status(200).json({ message: "Name added successfully", user: sun });
        } catch (err) {
          console.log("err", err);
          return commonControler.errorMessage("occurred error", res);
        }
      }
         // add parentsdata
         async addParentsData(req, res) {
          const { _id, fName, mName, address } = req.body;
          
          try {
              const user = await User.findById(_id);
              
              if (!user) {
                  return commonController.errorMessage("User not found", res);
              }
              
              let userParent = await parent.findOne({ userId: user._id });
              
              if (userParent) {
                  userParent.fName = fName;
                  userParent.mName = mName;
                  userParent.address = address;
                  await userParent.save();
                  return commonControler.successMessage(userParent, "Updated data", res);
              } else {
                  const addParentData = await parent.create({
                    fName,
                    mName,
                      address,
                      userId: user._id
                  });
                  return commonControler.successMessage(addParentData, "Added parent data", res);
              }
          } catch (err) {
              console.log(err, "error");
              return commonControler.errorMessage("An error occurred", res);
          }
      }






// add image
         async AddImage(req, res) {
          try {
            const { file } = req;
            const { _id } = req.body; 
        
            console.log("req.......", file);
            
            if (!file) {
              return commonControler.errorMessage("No file uploaded", res);
            }
        
            const user = await User.findById(_id);
            if (user) {
              return commonControler.errorMessage("User already exists", res);
            }
        
            const imagePath = file.path;
            if (!imagePath.match(/\.(png|jpg|jpeg)$/)) {
              return commonControler.errorMessage("Please upload a PNG or JPG image", res);
            }
        
            const profileUrl = `https://api.orthomatri.com/${file.filename}`;
            await User.create({ profile: profileUrl });
        
            return commonControler.successMessage(profileUrl, "Profile created successfully", res);
          } catch (error) {
            console.error(error);
            return commonControler.errorMessage("Failed to upload profile", res);
          }
        }
        

  // updatedImage function to handle updating an existing user profile image
  async  updatedImage(req, res) {
    try {
      const { _id } = req.body;
      if (!ObjectId.isValid(_id)) {
        return commonControler.errorMessage("Invalid ObjectId format", res);
      }
  
      const { file } = req;
  
      console.log('Received _id:', _id);
      console.log('Received file:', file);
  
      if (!file) {
        return commonControler.errorMessage("No file uploaded", res);
      }
  
      const user = await User.findById(_id);
      if (!user) {
        return commonControler.errorMessage("User not found", res);
      }
  
      const imagePath = file.path;
      if (!imagePath.match(/\.(png|jpg|jpeg)$/)) {
        return commonControler.errorMessage("Please upload a PNG or JPG image", res);
      }
  
      const profileUrl = `https://api.orthomatri.com/${file.filename}`;
      user.profile = profileUrl;  // Set the new profile URL
      await user.save();  // Save the changes
  
      return commonControler.successMessage(profileUrl, "Profile updated successfully", res);
    } catch (error) {
      console.error('Error:', error);
      return commonControler.errorMessage("Failed to upload profile", res);
    }
  }

          }
      
   



         
      

    
module.exports = UserController;
