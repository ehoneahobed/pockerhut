const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");
const { productImageUpload, uploadMultipleImages, uploadMultiToCloudinary } = require("../middlewares/uploadFile");
const {
    verifyTokenAndAdmin,
    verifyTokenAndAuthorization,
    verifyToken,
  } = require("../controllers/verifyToken");

// Create a product
router.post("/", uploadMultipleImages, uploadMultiToCloudinary, productController.createProduct);

// update product approvalStatus
router.put('/:id/approvalStatus', productController.updateApprovalStatus);

// Update product visibilityStatus
router.put('/:id/visibilityStatus', productController.updateVisibilityStatus);

// Update a product
router.patch("/:productId", productImageUpload, productController.updateProduct);


// Delete a product
router.delete("/:productId", productController.deleteProduct);

// Get all approved products
router.get("/approved", productController.getApprovedProducts);

// Get a single product
router.get("/:productId", productController.getProduct);

// Get all products
router.get("/", productController.getAllProducts);

// Get all products by Given vendor
router.get("/vendor/:vendorId", productController.getProductsByVendor);

// get all approved product from a given vendor
router.get("/approved/:vendorId", productController.getAllApprovedProductsByVendor);

// get all featured products
router.get("/approved/:vendorId", productController.getFeaturedProducts);

module.exports = router;
