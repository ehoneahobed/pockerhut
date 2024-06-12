const { Category, Subcategory } = require('../models/Categories');

// ************** SUBCATEGORIES **********************

// Create a new subcategory
exports.createSubcategory = async (req, res) => {
  try {
    const { name, description, categoryId } = req.body;

    const existingSubcategory = await Subcategory.findOne({ name });
    if (existingSubcategory) {
      return res.status(400).json({ message: 'Subcategory already exists' });
    }

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

    // Update the category with the new subcategory ID
    category.subcategories.push(savedSubcategory._id);
    await category.save();

    res.status(201).json(savedSubcategory);
  } catch (error) {
    res.status(500).json(error);
  }
};


// create multiple subcategories
exports.createMultipleSubcategories = async (req, res) => {
  const { categoryId, subcategories } = req.body; // Expect subcategories array and a single categoryId

  try {
      // Validate the existence of the parent category first
      const parentCategory = await Category.findById(categoryId);
      if (!parentCategory) {
          return res.status(404).json({ message: 'Parent category not found' });
      }

      // Create subcategory documents with the single categoryId
      const subcategoriesToCreate = subcategories.map(subcat => ({
          name: subcat.name,
          description: subcat.description,
          parent: categoryId  // Use the single categoryId for all subcategories
      }));

      const createdSubcategories = await Subcategory.insertMany(subcategoriesToCreate);

      // Update the parent category with the new subcategories
      parentCategory.subcategories.push(...createdSubcategories.map(subcat => subcat._id));
      await parentCategory.save();

      res.status(201).json({ message: 'Subcategories created successfully', data: createdSubcategories });
  } catch (error) {
      console.error('Error creating multiple subcategories:', error);
      res.status(500).json({ message: "Failed to create subcategories", error: error.message });
  }
};


// // Update a subcategory
// exports.updateSubcategory = async (req, res) => {
//   try {
//     const subcategoryId = req.params.id;
//     const { name, description, categoryId } = req.body;

//     // Find the subcategory by ID
//     const subcategory = await Subcategory.findById(subcategoryId);
//     if (!subcategory) {
//       return res.status(404).json({ message: 'Subcategory not found' });
//     }

//     // Check if the category exists
//     const category = await Category.findById(categoryId);
//     if (!category) {
//       return res.status(404).json({ message: 'Category not found' });
//     }

//     // Update the subcategory properties
//     subcategory.name = name;
//     subcategory.description = description;
//     subcategory.parent = category._id;

//     // Save the updated subcategory to the database
//     const updatedSubcategory = await subcategory.save();

//     res.status(200).json(updatedSubcategory);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };


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

    // Store the original parent category ID
    const originalCategoryId = subcategory.parent;

    // Update the subcategory properties
    subcategory.name = name;
    subcategory.description = description;

    // Check if the parent category is being updated
    if (categoryId !== subcategory.parent.toString()) {
      
      // Check if the new category exists
      const newCategory = await Category.findById(categoryId);
      if (!newCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }
      
      // Remove the subcategory ID from the old category's subcategories array
      const oldCategory = await Category.findById(subcategory.parent);
      oldCategory.subcategories.pull(subcategory._id);
      await oldCategory.save();


      // Update the parent category
      subcategory.parent = newCategory._id;

      // Add the subcategory ID to the new category's subcategories array
      newCategory.subcategories.push(subcategory._id);
      await newCategory.save();
    }

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

    // Find the subcategory to be deleted
    const subcategory = await Subcategory.findById(subcategoryId);
    if (!subcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    // Delete the subcategory
    await subcategory.delete();


    // Remove the subcategory ID from the corresponding category's subcategories array
    await Category.findByIdAndUpdate(
      subcategory.parent,
      { $pull: { subcategories: subcategoryId } }
    );

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
// exports.getSubcategories = async (req, res) => {
//   try {
//     // Get all subcategories
//     const subcategories = await Subcategory.find();

//     res.status(200).json(subcategories);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };


// Get all subcategories
exports.getSubcategories = async (req, res) => {
  try {
    // Retrieve all subcategories from the database and populate only the name field of the parent category
    const subcategories = await Subcategory.find().populate('parent', 'name');

    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json(error);
  }
};
