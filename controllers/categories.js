const { Category, Subcategory } = require("../models/Categories");
const { CategoryQuestion } = require("../models/CategoryQuestion");
const { Product } = require("../models/Product");
const Vendor = require("../models/Vendor");
const { sendEmail } = require("../services/email.service");
const { commissionAndDeliveryRate, deleteCategory, disableCategory } = require("../utils/emailTemplates");

// ************* CATEGORIES **********************************

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const {
      name,
      description,
      featuredImage,
      commissionRate,
      deliveryFeeRate,
    } = req.body;
    const existingcategory = await Category.findOne({ name });

    if (existingcategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    // Create a new category
    const category = new Category({
      name,
      description,
      featuredImage,
      commissionRate,
      deliveryFeeRate,
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
    const {
      name,
      description,
      featuredImage,
      deliveryFeeRate,
      commissionRate,
    } = req.body;

    // Find the category by ID
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Track if commissionRate or deliveryFeeRate have changed
    const commissionRateChanged =
      commissionRate !== undefined &&
      commissionRate !== category.commissionRate;
    const deliveryFeeRateChanged =
      deliveryFeeRate !== undefined &&
      deliveryFeeRate !== category.deliveryFeeRate;

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
    if (commissionRateChanged) {
      category.commissionRate = commissionRate;
    }
    if (deliveryFeeRateChanged) {
      category.deliveryFeeRate = deliveryFeeRate;
    }

    // Save the updated category to the database
    const updatedCategory = await category.save();

    // Send email if either commissionRate or deliveryFeeRate has changed
    if (commissionRateChanged || deliveryFeeRateChanged) {
      const products = await Product.find({
        "information.category": categoryId,
      });
      const vendorIds = [...new Set(products.map((product) => product.vendor))];
      const vendors = await Vendor.find({ _id: { $in: vendorIds } });

      for (const vendor of vendors) {
        const fullName = `${
          vendor.sellerAccountInformation.firstName ||
          vendor.businessInformation.businessOwnerName
        } ${vendor.sellerAccountInformation.lastName || ""}`.trim();
        await sendEmail({
          to: vendor.sellerAccountInformation.email,
          subject: "Updated Commission and Delivery Rates",
          html: commissionAndDeliveryRate(
            fullName,
            commissionRate || category.commissionRate,
            deliveryFeeRate || category.deliveryFeeRate
          ),
        });
      }
    }
    return res.status(200).json(updatedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const products = await Product.find({ "information.category": categoryId });
    if (products.length > 0) {
      const vendorIds = [...new Set(products.map((product) => product.vendor))];
      const vendors = await Vendor.find({ _id: { $in: vendorIds } });
      await Product.deleteMany({ "information.category": categoryId });
      await Subcategory.deleteMany({ parent: categoryId });
      await CategoryQuestion.deleteMany({ category: categoryId });
      await Category.findByIdAndDelete(categoryId);
      for (const vendor of vendors) {
        const fullName = `${
          vendor.sellerAccountInformation.firstName ||
          vendor.businessInformation.businessOwnerName
        } ${vendor.sellerAccountInformation.lastName || ""}`.trim();

        await sendEmail({
          to: vendor.sellerAccountInformation.email,
          subject: "Category Deletion Notification",
          html: deleteCategory(fullName, category.name),
        });
      }
    } else {
      await Category.findByIdAndDelete(categoryId);
    }
    res.status(200).json({
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
    const categories = await Category.find().populate({
      path: "subcategories",
      select: "name",
    });

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.enableOrDisableCategory = async (req, res) => {
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

    // Find all products associated with this category
    const products = await Product.find({ "information.category": categoryId });

    // If there are any products associated with this category, send email
    if (products.length > 0 && updatedCategory.isDisabled) {
      const vendorIds = [...new Set(products.map((product) => product.vendor))];
      const vendors = await Vendor.find({ _id: { $in: vendorIds } });
      for (const vendor of vendors) {
        const fullName = `${
          vendor.sellerAccountInformation.firstName ||
          vendor.businessInformation.businessOwnerName
        } ${vendor.sellerAccountInformation.lastName || ""}`.trim();
        await sendEmail({
          to: vendor.sellerAccountInformation.email,
          subject: "Category Update Notification",
          html: disableCategory(fullName, category.name),
        });
      }
    }
    res.status(200).json({ status: "Status updated successfully", data: updatedCategory });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.createCategoryWithSubcategories = async (req, res) => {
  const { name, description, featuredImage, subcategories } = req.body;
  try {
    // Step 1: Create the category first without subcategories
    const category = new Category({
      name,
      description,
      featuredImage,
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
    res.status(500).json({
      message: "Failed to create category and subcategories",
      error: error.message,
    });
  }
};
