// models/user.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const parentSchema = new Schema({
  mothername: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  fathername: {
    type: String,
    required: true,
    trim: true,
  },
  adress: {
    type: String,
    required: true,
    trim: true,
  },
  userid: {
    type: String,
    required: true,
    trim: true,
  },
}, { timestamps: true });

const parent = mongoose.model('parents', parentSchema);  // Correct variable name is 'parent'

module.exports = parent;
