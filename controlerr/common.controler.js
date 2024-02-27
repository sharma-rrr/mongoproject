const { Request, Response } = require('express');
const bcrypt = require('bcrypt');

class CommonController {
    successMessage(data, msg, res) {
        try {
            return res.status(200).send({
                message: msg,
                data: data
            });
        } catch (e) {
            console.error(e);
            return res.status(500).send({
                error: {
                    message: 'Internal Server Error'
                }
            });
        }
    }

    errorMessage(msg, res) {
        try {
            return res.status(400).send({
                error: {
                    message: msg
                }
            });
        } catch (e) {
            console.error(e);
            return res.status(500).send({
                error: {
                    message: 'Internal Server Error'
                }
            });
        }
    }
    // password becrupt
    async hashPassword(myPlaintextPassword) {
        try {
          const saltRounds = 10;
          const salt = await bcrypt.genSalt(saltRounds);
          const hash = await bcrypt.hash(myPlaintextPassword, salt);
      
          return hash; // Return the hashed password
        } catch (error) {
          console.error(error);
          throw new Error('Error hashing password');
        }
      }
}

module.exports = new CommonController();
