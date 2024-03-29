const { Category, Subcategory } = require('../models/Categories');

// ************* CATEGORIES **********************************

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { name, description, featuredImage } = req.body;

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
    const { name, description } = req.body;

    // Find the category by ID
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Update the category properties
    category.name = name;
    category.description = description;

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

    res.status(200).json({ message: 'Category deleted successfully' });
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
      path: 'subcategories',
      select: 'name'
    });;

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
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
    const categories = await Category.find().populate({
      path: 'subcategories',
      select: 'name'
    });

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
};
