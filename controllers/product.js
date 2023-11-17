const Product = require('../models/Product')
const Category = require('../models/Categories');
// const Review = require("../models/");

// Create a new product
// exports.createProduct = async (req, res) => {
//     try {
//       // Validate the request
//       if (
//         !req.body.information ||
//         !req.body.details ||
//         !req.body.pricing
//       ) {
//         return res.status(400).send({
//           message:
//             "Product information, product details, and pricing details are all required",
//         });
//       }
  
//       // Create a new product
//       const product = new Product({
//         information: req.body.information,
//         details: req.body.details,
//         pricing: req.body.pricing,
//         images: req.body.productImages || [],
//         productReviews: [],
//       });
  
//       // Save the product in the database
//       const savedProduct = await product.save();
  
//       res.send(savedProduct);
//     } catch (err) {
//       res.status(500).send({
//         message: err.message || "Some error occurred while creating the product.",
//       });
//     }
//   };

exports.createProduct = async (req, res) => {
  try {
    // Extract data from the request body using square bracket notation
    const {
      information,
      details,
      pricing,
      images,
      approvalStatus,
      visibilityStatus,
      featured,
      avgRating,
    } = req.body;

    // Create an array to store the formatted category questions
    const formattedCategoryQuestions = information.categoryQuestions.map(
      (questionData) => {
        const { question, answer } = questionData;
        return { question, answer };
      }
    );

    // Create a new product
    const product = new Product({
      information: {
        productName: information.productName,
        category: information.category,
        subcategory: information.subcategory,
        categoryQuestions: formattedCategoryQuestions,
      },
      details: {
        productWeight: details.productWeight,
        productContent: details.productContent,
        cookingMethod: details.cookingMethod,
        nutritionalValue: details.nutritionalValue,
        deliveryDetails: details.deliveryDetails,
        productDescription: details.productDescription,
      },
      pricing: {
        saleStartDate: pricing.saleStartDate,
        saleEndDate: pricing.saleEndDate,
        productPrice: pricing.productPrice,
        quantity: pricing.quantity,
      },
      images,
      approvalStatus,
      visibilityStatus,
      featured,
      avgRating,
      reviews: [],
      vendor: req.body.vendorId,
    });

    // Save the product in the database
    const savedProduct = await product.save();

    res.send(savedProduct);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the product.",
    });
  }
};

  


// update approvalStatus of a given product
exports.updateApprovalStatus = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).send({
                message: "Product not found with id " + id
            });
        }

        product.approvalStatus = req.body.approvalStatus;

        const updatedProduct = await product.save();

        res.send(updatedProduct);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + id
            });
        }
        return res.status(500).send({
            message: "Error updating product with id " + id
        });
    }
};


// Updating a product
// exports.updateProduct = async (req, res) => {
//     // Validate the request
//     if (!req.body.category || !req.body.information || !req.body.details || !req.body.pricing) {
//         return res.status(400).send({
//             message: "Product information, category, product details, and pricing details are required"
//         });
//     }

//     try {
//         // Find the product and update it with the request body
//         const product = await Product.findByIdAndUpdate(
//             req.params.productId,
//             {
//                 category: req.body.category,
//                 information: req.body.information,
//                 details: req.body.details,
//                 pricing: req.body.pricing,
//                 images: req.files.map(file => file.filename) || [],
//                 approvalStatus: req.body.approvalStatus || "pending"
//             },
//             { new: true }
//         );

//         if (!product) {
//             return res.status(404).send({
//                 message: "Product not found with id " + req.params.productId
//             });
//         }
//         res.send(product);
//     } catch (err) {
//         if (err.kind === "ObjectId") {
//             return res.status(404).send({
//                 message: "Product not found with id " + req.params.productId
//             });
//         }
//         return res.status(500).send({
//             message: "Error updating product with id " + req.params.productId
//         });
//     }
// };

exports.updateProduct = async (req, res) => {
    try {
        const updates = {};
        if (req.body.information) updates.information = req.body.information;
        if (req.body.details) updates.details = req.body.details;
        if (req.body.pricing) updates.pricing = req.body.pricing;
        if (req.files) updates.images = req.files.map(file => file.filename);
        if (req.body.approvalStatus) updates.approvalStatus = req.body.approvalStatus;

        // Find the product and update it with the request body
        const product = await Product.findByIdAndUpdate(
            req.params.productId,
            updates,
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

// // get a single product
// exports.getProduct = async (req, res) => {
//     try {
//         const product = await Product.findById(req.params.productId).populate();
//         if (!product) {
//             return res.status(404).send({
//                 message: "Product not found with id " + req.params.productId
//             });
//         }
//         res.send(product);
//     } catch (err) {
//         if (err.kind === "ObjectId") {
//             return res.status(404).send({
//                 message: "Product not found with id " + req.params.productId
//             });
//         }
//         return res.status(500).send({
//             message: "Error retrieving product with id " + req.params.productId
//         });
//     }
// };

// get a single product
exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId)
            .populate('information.category', 'name') // Populate the category field and select only the name field
            .populate('information.subcategory', 'name') // Populate the subcategory field and select only the name field
            .populate('reviews') // Populate the reviews field
            .populate('information.categoryQuestions.question', 'question'); // Populate the categoryQuestions.question field and select only the question field

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
// exports.getAllProducts = async (req, res) => {
//     try {
//         const products = await Product.find();
//         res.send(products);
//     } catch (err) {
//         res.status(500).send({
//             message: "Error retrieving products"
//         });
//     }
// };

// exports.getAllProducts = async (req, res) => {
//     try {
//         // Populate the 'vendor' field with vendor details
//         const products = await Product.find().populate('vendor').populate('information.category', 'name');
//         res.send(products);
//     } catch (err) {
//         res.status(500).send({
//             message: "Error retrieving products"
//         });
//     }
// };

exports.getAllProducts = async (req, res) => {
    try {
        // Populate the 'vendor' field with vendor details
        const products = await Product.find()
            .populate({
                path: 'vendor',
                model: 'Vendor', // Replace 'Vendor' with the actual model name
            })
            .populate({
                path: 'information.category',
                model: 'Category', // Replace 'Category' with the actual model name
            })
            .populate({
                path: 'information.subcategory',
                model: 'Subcategory', // Replace 'Subcategory' with the actual model name
            })
            .populate({
                path: 'information.categoryQuestions.question',
                model: 'CategoryQuestion', // Replace 'CategoryQuestion' with the actual model name
            })
            .populate({
                path: 'reviews',
                model: 'Review', // Replace 'Review' with the actual model name
            });

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
        const approvedProducts = await Product.find({ approvalStatus: "approved" });
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
        const products = await Product.find({ "vendor": req.params.vendorId });
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
// exports.updateApprovalStatus = async (req, res) => {
//     const { productId, approvalStatus } = req.params;

//     try {
//         const product = await Product.findById(productId);
//         if (!product) {
//             return res.status(404).send({
//                 message: `Product not found with id ${productId}`
//             });
//         }

//         product.approvalStatus = approvalStatus;
//         const updatedProduct = await product.save();
//         return res.send(updatedProduct);
//     } catch (err) {
//         return res.status(500).send({
//             message: `Error updating approval status of product with id ${productId}`
//         });
//     }
// };

// get all featured products
exports.getFeaturedProducts = async (req, res) => {
    try {
      const products = await Product.find({ featured: true });
      res.send(products);
    } catch (err) {
      return res.status(500).send({
        message: "Error retrieving featured products",
      });
    }
  };
  