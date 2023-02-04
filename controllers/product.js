const Product = require('../models/Product')
const Category = require('../models/Categories');
// const Review = require("../models/");

// Creating a product
exports.createProduct = async (req, res) => {
    try {
        // Validate the request
        if (!req.body.category || !req.body.productInformation || !req.body.productDetails || !req.body.pricing) {
            return res.status(400).send({
                message: "Product information, category, product details, and pricing details are required"
            });
        }

        // Create a new product
        const product = new Product({
            category: req.body.category,
            productInformation: req.body.productInformation,
            productDetails: req.body.productDetails,
            pricing: req.body.pricing,
            images: req.body.images || [],
            approvalStatus: req.body.approvalStatus || "pending",
            productReviews: []
        });

        // Save the product in the database
        const savedProduct = await product.save();
        res.send(savedProduct);
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the product."
        });
    }
};


// Updating a product
exports.updateProduct = async (req, res) => {
    // Validate the request
    if (!req.body.category || !req.body.productInformation || !req.body.productDetails || !req.body.pricing) {
        return res.status(400).send({
            message: "Product information, category, product details, and pricing details are required"
        });
    }

    try {
        // Find the product and update it with the request body
        const product = await Product.findByIdAndUpdate(
            req.params.productId,
            {
                category: req.body.category,
                productInformation: req.body.productInformation,
                productDetails: req.body.productDetails,
                pricing: req.body.pricing,
                images: req.body.images || [],
                approvalStatus: req.body.approvalStatus || "pending"
            },
            { new: true }
        );

        if (!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });
        }
        res.send(product);
    } catch (err) {
        if (err.kind === "ObjectId") {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });
        }
        return res.status(500).send({
            message: "Error updating product with id " + req.params.productId
        });
    }
};


// Deleting a product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndRemove(req.params.productId);
        if (!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });
        }
        res.send({ message: "Product deleted successfully!" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// get a single product
exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });
        }
        res.send(product);
    } catch (err) {
        if (err.kind === "ObjectId") {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });
        }
        return res.status(500).send({
            message: "Error retrieving product with id " + req.params.productId
        });
    }
};



// get all the products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.send(products);
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving products"
        });
    }
};


// get all approved products
exports.getApprovedProducts = async (req, res) => {
    try {
        const approvedProducts = await Product.find({ approvalStatus: true });
        res.send(approvedProducts);
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving approved products"
        });
    }
};


// get all products from a given vendor
exports.getProductsByVendor = async (req, res) => {
    try {
        const products = await Product.find({ "vendor._id": req.params.vendorId });
        if (!products) {
            return res.status(404).send({
                message: "No products found for vendor with id " + req.params.vendorId
            });
        }
        res.send(products);
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving products for vendor with id " + req.params.vendorId
        });
    }
};

//   get all approved products from a given vendor
exports.getAllApprovedProductsByVendor = async (req, res) => {
    const vendorId = req.params.vendorId;
    try {
        const products = await Product.find({
            "productInformation.vendor": vendorId,
            approvalStatus: "approved"
        });

        if (!products) {
            return res.status(404).send({
                message: "No approved products found for the given vendor"
            });
        }

        res.send(products);
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving approved products for the given vendor"
        });
    }
};

// get analytics on approved and unapproved products
exports.getProductAnalytics = async (req, res) => {
    try {
        const approvedProducts = await Product.countDocuments({ approvalStatus: "approved" });
        const unapprovedProducts = await Product.countDocuments({ approvalStatus: "pending" });

        res.send({
            approvedProducts,
            unapprovedProducts,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Error retrieving product analytics"
        });
    }
};

// update the approval status of a product:
exports.updateApprovalStatus = async (req, res) => {
    const { productId, approvalStatus } = req.params;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send({
                message: `Product not found with id ${productId}`
            });
        }

        product.approvalStatus = approvalStatus;
        const updatedProduct = await product.save();
        return res.send(updatedProduct);
    } catch (err) {
        return res.status(500).send({
            message: `Error updating approval status of product with id ${productId}`
        });
    }
};
