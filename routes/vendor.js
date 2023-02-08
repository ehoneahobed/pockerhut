const express = require('express');
const router = express.Router();
const {uploadVendorFiles, uploadFile}  = require('../middlewares/uploadFile');
const vendorController = require('../controllers/vendor');
const { verifyTokenAndAdmin, verifyTokenAndAuthorization, verifyToken } = require('../controllers/verifyToken');

// Create Vendor
router.post('/', uploadVendorFiles, vendorController.createVendor);

// login vendor
router.post("/login", vendorController.loginVendor);

// Update Vendor
router.put('/:vendorId', vendorController.updateVendor);

// Delete Vendor
router.delete('/:id', verifyTokenAndAuthorization, vendorController.deleteVendor);

// Get a vendor
router.get('/:id', verifyTokenAndAuthorization, vendorController.getVendor);

// Get all vendors
router.get('/', verifyTokenAndAdmin, vendorController.getAllVendors);

// Get vendors by store status
router.get('/status', verifyTokenAndAdmin, vendorController.getVendorsByStoreStatus);

// update store status for a given vendor
router.put(":vendorId/status", verifyTokenAndAdmin, vendorController.updateVendorStatus);

module.exports = router;