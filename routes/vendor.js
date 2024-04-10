const express = require("express");
const router = express.Router();
const { uploadVendorFiles, uploadFile, uploadVendorFilesToCloudinary } = require("../middlewares/uploadFile");
const vendorController = require("../controllers/vendor");
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
  verifyToken,
} = require("../controllers/verifyToken");


// Create Vendor
router.post("/", uploadVendorFiles, uploadVendorFilesToCloudinary,  vendorController.createVendor);

// login vendor
router.post("/login", vendorController.loginVendor);

// Update Vendor
router.put("/:vendorId", uploadVendorFiles, uploadVendorFilesToCloudinary, vendorController.updateVendor);

// Update Vendor
// router.patch("/:vendorId", uploadVendorFiles, uploadVendorFilesToCloudinary, vendorController.updateVendorDetails );

// update store status for a given vendor
router.put(
  "/:vendorId/status",
  verifyTokenAndAdmin,
  vendorController.updateVendorStatus
);


// Delete Vendor
router.delete(
  "/:id",
  vendorController.deleteVendor
);

// Get all vendorAccounts and summaries
router.get("/vendor-accounts", vendorController.getAllVendorAccounts);


// Get a vendor
router.get("/:id", verifyTokenAndAuthorization, vendorController.getVendor);



// Get all vendors
router.get("/", verifyTokenAndAdmin, vendorController.getAllVendors);



// Get vendors by store status
router.get(
  "/status",
  verifyTokenAndAdmin,
  vendorController.getVendorsByStoreStatus
);




// Request password reset email
router.post('/request-reset-password', vendorController.sendPasswordResetEmail);

// reset password endpoint
router.post('/reset-password/:token', vendorController.resetPassword);

module.exports = router;
