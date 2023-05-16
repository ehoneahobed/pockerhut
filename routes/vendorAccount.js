const express = require('express');
const router = express.Router();
const vendorAccountController = require('../controllers/vendorAccount');

router.post('/', vendorAccountController.createVendorAccount);
router.get('/:id', vendorAccountController.getVendorAccountById);
router.get('/vendor/:vendorId', vendorAccountController.getVendorAccountsByVendorId);
router.get('/order/:orderId', vendorAccountController.getVendorAccountsByOrderId);
router.put('/:id', vendorAccountController.updateVendorAccount);
router.delete('/:id', vendorAccountController.deleteVendorAccount);
router.post('/purchase', vendorAccountController.createVendorAccount);
router.post('/refund', vendorAccountController.createVendorAccountRefund);

module.exports = router;
