const express = require('express');
const router = express.Router();
const favoriteProductsController = require('./favoriteProductsController');

// GET all favorite products
router.get('/', favoriteProductsController.getAllFavoriteProducts);

// GET a user's favorite products
router.get('/:userId', favoriteProductsController.getFavoriteProductsByUserId);

// POST a new favorite product
router.post('/', favoriteProductsController.createFavoriteProduct);

// DELETE a favorite product
router.delete('/:id', favoriteProductsController.deleteFavoriteProduct);

module.exports = router;
