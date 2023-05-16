const mongoose = require('mongoose');

const favoriteProductSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
}, {timestamps: true});

const FavoriteProduct = mongoose.model('FavoriteProduct', favoriteProductSchema);

module.exports = FavoriteProduct;
