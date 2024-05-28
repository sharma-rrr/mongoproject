const common = require("mocha/lib/interfaces/common");
const User = require("../models/user");
const commonControler = require("./common.controler");

class CronJob {
  async fiveseccronjob(req,res) {
    try {
        // Add your cron job logic here
        console.log('Executing 10-second cron job');
        const users = await User.find({ isPurchase: false });
        
        for (let i = 0; i < users.length; i++) {
            console.log(users[i], "dataloop");
            users[i].isPurchase = true; // Access users[i] instead of user
            await users[i].save(); //
            // console.log("yes data updated");        
              console.log(users[i],"updated total entries")
        }
        if (users.length === 0) {
            console.log('No users to update');
        }
    } catch (error) {
        console.error('Error executing cron job:', error);
        commonControler.errorMessage("err",res)
    }
}

  }
  
  module.exports = new CronJob();
  