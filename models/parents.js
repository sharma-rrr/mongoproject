const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const parentsSchema = new Schema({
  userId: {
    type: String,
    trim: false 
  },
  fName: {
    type: String, 
    trim: false // No trimming will be done
  },
  mName: {
    type: String, 
    trim: false // No trimming will be done
  },
  address: {
    type: String, // No 'trim' option here
  },
}, { timestamps: true });

const User = mongoose.model('Parents', parentsSchema);

module.exports = User;
