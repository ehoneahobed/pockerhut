const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");
const { productImageUpload } = require("../middlewares/uploadFile");
const {
    verifyTokenAndAdmin,
    verifyTokenAndAuthorization,
    verifyToken,
  } = require("../controllers/verifyToken");

// Create a product
router.post("/", productImageUpload, productController.createProduct);

// update product approvalStatus
router.put('/:id/approvalStatus', productController.updateApprovalStatus);

// // Update a product
// router.put("/:productId", productController.updateProduct);

// // Delete a product
// router.delete("/:productId", productController.deleteProduct);

// // Get a single product
// router.get("/:productId", productController.getProduct);

// // Get all products
// router.get("/", productController.getAllProducts);

// // Get all approved products
// router.get("/approved", productController.getApprovedProducts);

module.exports = router;
