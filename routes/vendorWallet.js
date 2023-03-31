const express = require('express');
const router = express.Router();
const vendorWalletController = require('../controllers/vendorWalletController');

// Create new vendor wallet
router.post('/', vendorWalletController.createVendorWallet);

// Get vendor wallet by vendor ID
router.get('/:vendorId', vendorWalletController.getVendorWalletByVendorId);

// Update vendor wallet balance
router.patch('/:vendorId/balance', vendorWalletController.updateVendorWalletBalance);

// Add previous payment to vendor wallet
router.post('/:vendorId/previous-payments', vendorWalletController.addPreviousPaymentToVendorWallet);

// Get vendor wallet balance
router.get('/:vendorId/balance', vendorWalletController.getVendorWalletBalance);

// Add payment to vendor wallet
router.post('/:vendorId/payments', vendorWalletController.addPaymentToVendorWallet);

// Get previous payments
router.get('/:vendorId/previous-payments', vendorWalletController.getPreviousPayments);

module.exports = router;
