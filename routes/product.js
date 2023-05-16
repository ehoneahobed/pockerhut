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

module.exports = router;
