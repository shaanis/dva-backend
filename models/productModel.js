const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: [String],
    required: true
  },
  colors: {
    type: [String],
    // required: true
  },
  sizes: {
    type: [String],
    required: true
  },
  category: {
    type: String,
    required: true
  }
});

const products = mongoose.model('products', productSchema);

module.exports = products;
