const { uploadImage, uploadSingleImage, uploadToCloudinary, uploadLoadedImage } = require("../middlewares/uploadFile");
const router = require("express").Router();
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
  verifyToken,
} = require("../controllers/verifyToken");

const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getCategories,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
  getSubcategory,
  getSubcategories
} = require("../controllers/categories");

// CATEGORIES

// Create a new category
router.post("/categories", verifyTokenAndAdmin, uploadSingleImage, uploadToCloudinary, createCategory);

// Update a category
router.put("/categories/:id", verifyTokenAndAdmin, updateCategory);

// Delete a category
router.delete("/categories/:id", verifyTokenAndAdmin, deleteCategory);

// Get a single category
router.get("/categories/:id", getCategory);

// Get all categories
router.get("/categories", getCategories);


// SUBCATEGORIES

// Create a new subcategory
router.post("/subcategories", verifyTokenAndAdmin, createSubcategory);

// Update a subcategory
router.put("/subcategories/:id", verifyTokenAndAdmin, updateSubcategory);

// Delete a subcategory
router.delete("/subcategories/:id", verifyTokenAndAdmin, deleteSubcategory);

// Get a single subcategory 
router.get("/subcategories/:id", getSubcategory);

// Get all subcategories
router.get("/subcategories", getSubcategories);

module.exports = router;
