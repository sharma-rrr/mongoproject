const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  uniqueId: {
    type: String,
    trim: false
  },
  money: {
    type: Number,
    trim: false
  },
  shield: {
    type: Number, // Assuming it's a shield, corrected from 'shilied'
    trim: false
  },
  levels: {
    type: Number,
    trim: false
  },
  isPurchase: {
    type: Boolean,
    default: false, // Assuming it's a boolean flag, defaulting to false
    trim: false
  },
  buster: {
    type: Number,
    trim: false
  },
  name: {
    type: String,
    trim: false
  },
  dailyReward: {
    type: String,
    trim: false
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
