const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const outfitSchema = new Schema({
  userId: {
    type: String,
    trim: false
  },
  selectOutfit: {
    type: String,
    trim: false
  },
  availbleOutfit: {
    type: String, 
    trim: false
  },
}, { timestamps: true });

const Userbike = mongoose.model('Userbike', outfitSchema);

module.exports = Userbike;
