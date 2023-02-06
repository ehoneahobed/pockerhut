const Category = require('../models/Categories');

// create a new category
exports.createCategory = async (req, res) => {
    try {
        // Create a new category
        const category = new Category({
            name: req.body.name,
            description: req.body.description
        });

        // Save the category to the database
        const savedCategory = await category.save();

        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(500).json(error);
    }
};

// updating a category
exports.updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;

        // Find the category and update it
        const updatedCategory = await Category.findByIdAndUpdate(categoryId, req.body, { new: true });

        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json(error);
    }
};

// deleting a category
exports.deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;

        // Find and delete the category
        await Category.findByIdAndDelete(categoryId);

        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json(error);
    }
};

// getting a single category
exports.getCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;

        // Find the category by id
        const category = await Category.findById(categoryId);

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json(error);
    }
};

// getting all categories
exports.getCategories = async (req, res) => {
    try {
        // Get all categories
        const categories = await Category.find();

        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json(error);
    }
};
