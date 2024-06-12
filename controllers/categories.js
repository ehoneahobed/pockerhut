const { Category, Subcategory } = require("../models/Categories");
const { CategoryQuestion } = require("../models/CategoryQuestion");

// ************* CATEGORIES **********************************

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { name, description, featuredImage } = req.body;
    const existingcategory = await Category.findOne({ name });

    if (existingcategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    // Create a new category
    const category = new Category({
      name,
      description,
      featuredImage,
    });

    // Save the category to the database
    const savedCategory = await category.save();

    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update a category
exports.updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { name, description, featuredImage } = req.body;

    // Find the category by ID
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Update the category properties
    if (name) {
      category.name = name;
    }
    if (description) {
      category.description = description;
    }
    if (featuredImage) {
      category.featuredImage = featuredImage;
    }

    // Save the updated category to the database
    const updatedCategory = await category.save();

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    // Find and delete the category
    await Category.findByIdAndDelete(categoryId);

    // Delete associated subcategories
    await Subcategory.deleteMany({ parent: categoryId });

    await CategoryQuestion.deleteMany({ category: categoryId });

    res
      .status(200)
      .json({
        message: "Category and associated subcategories deleted successfully",
      });
  } catch (error) {
    res.status(500).json(error);
  }
};
// Get a single category
exports.getCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    // Find the category by ID
    const category = await Category.findById(categoryId).populate({
      path: "subcategories",
      select: "name",
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    // Find all categories
    const categories = await Category.find({ isDisabled: false }).populate({
      path: "subcategories",
      select: "name",
    });

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.enableordisableCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    // Find the category by ID
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Toggle the category's disabled status
    category.isDisabled = !category.isDisabled;

    // Save the updated category to the database
    const updatedCategory = await category.save();

    res
      .status(200)
      .json({ status: "Status updated successfully", data: updatedCategory });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.createCategoryWithSubcategories = async (req, res) => {
  const { name, description, featuredImage, subcategories } = req.body
  try {
    // Step 1: Create the category first without subcategories
    const category = new Category({
      name,
      description,
      featuredImage
    });

    const savedCategory = await category.save();

    // Step 2: Now that we have the category ID, create subcategory documents
    const subcategoryDocuments = subcategories.map((subcat) => ({
      name: subcat.name,
      description: subcat.description,
      parent: savedCategory._id, // Set the parent to the newly created category ID
    }));

    const createdSubcategories = await Subcategory.insertMany(
      subcategoryDocuments
    );

    // Step 3: Update the category with references to the subcategories
    savedCategory.subcategories = createdSubcategories.map(
      (subcat) => subcat._id
    );
    await savedCategory.save();

    // Populate subcategories in the response
    await savedCategory
      .populate({
        path: "subcategories",
        select: "name description parent",
      })
      .execPopulate();

    res.status(201).json(savedCategory);
  } catch (error) {
    console.error("Error creating category with subcategories:", error);
    res
      .status(500)
      .json({
        message: "Failed to create category and subcategories",
        error: error.message,
      });
  }
};
