const express = require('express');
const router = express.Router();
const favoriteProductsController = require('../controllers/favoriteProduct');

// GET all favorite products
// router.get('/', favoriteProductsController.getAllFavoriteProducts);

// GET a user's favorite products
router.get('/:userId', favoriteProductsController.getFavoritesByUserId);

// Add a new favorite product
router.post('/', favoriteProductsController.addToFavorites);

// DELETE a favorite product
router.delete('/delete', favoriteProductsController.removeFromFavorites);

// CHECK if a product is part of a user's favorite products
router.get('/check-favorite/:userId/:productId', favoriteProductsController.checkIfFavorite);


module.exports = router;
