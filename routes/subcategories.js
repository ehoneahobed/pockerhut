const { uploadImage, uploadSingleImage, uploadToCloudinary, uploadLoadedImage } = require("../middlewares/uploadFile");
const router = require("express").Router();
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
  verifyToken,
} = require("../controllers/verifyToken");

const {
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
  getSubcategory,
  getSubcategories
} = require("../controllers/subcategories");


// SUBCATEGORIES

// Create a new subcategory
router.post("/", verifyTokenAndAdmin, createSubcategory);

// Update a subcategory
router.put("/:id", verifyTokenAndAdmin, updateSubcategory);

// Delete a subcategory
router.delete("/:id", verifyTokenAndAdmin, deleteSubcategory);

// Get a single subcategory 
router.get("/:id", getSubcategory);

// Get all subcategories
router.get("/", getSubcategories);

module.exports = router;
