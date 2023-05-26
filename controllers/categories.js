const { Category, Subcategory } = require('../models/Categories');

// ************* CATEGORIES **********************************

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Create a new category
    const category = new Category({
      name,
      description,
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
    const category = await Category.findById(categoryId);

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
    const categories = await Category.find();

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
};



// ************** SUBCATEGORIES **********************

// Create a new subcategory
exports.createSubcategory = async (req, res) => {
  try {
    const { name, description, categoryId } = req.body;

    // Check if the category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Create a new subcategory
    const subcategory = new Subcategory({
      name,
      description,
      parent: category._id
    });

    // Save the subcategory to the database
    const savedSubcategory = await subcategory.save();

    res.status(201).json(savedSubcategory);
  } catch (error) {
    res.status(500).json(error);
  }
};


// Update a subcategory
exports.updateSubcategory = async (req, res) => {
  try {
    const subcategoryId = req.params.id;
    const { name, description, categoryId } = req.body;

    // Find the subcategory by ID
    const subcategory = await Subcategory.findById(subcategoryId);
    if (!subcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    // Check if the category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Update the subcategory properties
    subcategory.name = name;
    subcategory.description = description;
    subcategory.parent = category._id;

    // Save the updated subcategory to the database
    const updatedSubcategory = await subcategory.save();

    res.status(200).json(updatedSubcategory);
  } catch (error) {
    res.status(500).json(error);
  }
};


// Delete a subcategory
exports.deleteSubcategory = async (req, res) => {
  try {
    const subcategoryId = req.params.id;

    // Find and delete the subcategory
    await Subcategory.findByIdAndDelete(subcategoryId);

    res.status(200).json({ message: "Subcategory deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get a single subcategory
exports.getSubcategory = async (req, res) => {
  try {
    const subcategoryId = req.params.id;

    // Find the subcategory by id
    const subcategory = await Subcategory.findById(subcategoryId);

    res.status(200).json(subcategory);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get all subcategories
exports.getSubcategories = async (req, res) => {
  try {
    // Get all subcategories
    const subcategories = await Subcategory.find();

    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json(error);
  }
};
