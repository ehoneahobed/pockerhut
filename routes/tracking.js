const express = require('express');
const router = express.Router();
const trackingController = require('../controllers/tracking');

// GET all tracking information
router.get('/', trackingController.getAllTracking);

// GET tracking information for a specific user
router.get('/:userId', trackingController.getTrackingByUserId);

// GET tracking information for a specific order
router.get('/order/:orderId', trackingController.getTrackingByOrderId);

// Get tracking by id
router.get('/:id', trackingController.getTrackingById);

// POST new tracking information
router.post('/', trackingController.createTracking);

// PUT update tracking information for a specific order
router.patch('/order/:orderId', trackingController.updateTracking);

// DELETE tracking information for a specific order
router.delete('/order/:orderId', trackingController.deleteTracking);

module.exports = router;
