const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart');


router.get('/', cartController.getCart);
router.post('/', cartController.addItemToCart);
router.put('/:itemId', cartController.updateCartItem);
router.delete('/:itemId', cartController.deleteCartItem);
router.delete('/', cartController.clearCart);

module.exports = router;









// // Create a new cart
// router.post('/', cartController.createCart);

// // Get all carts
// // router.get('/', cartController.getAllCarts);

// // Get a single cart by ID
// router.get('/:cartId', cartController.getCart);

// // Update a cart by ID
// router.patch('/:cartId', cartController.updateCart);

// // Delete a cart by ID
// router.delete('/:cartId', cartController.deleteCart);

// module.exports = router;
