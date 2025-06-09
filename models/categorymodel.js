const mongoose = require('mongoose');
const { image } = require('../config/cloudDb');

const categorySchema = new mongoose.Schema({
  name: {
    type:String,
    required: true,
    unique: true
},
image: {
    type: String,
    required: true,
    default: image
  },
  description: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
  },    
})

const categories = mongoose.model('categories', categorySchema);

module.exports = categories;