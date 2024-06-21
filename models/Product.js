const mongoose = require("mongoose");

const productInformationSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    // required: [true, 'category is required. Please provide the category ID'],
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory",
    // required: true,
  },
  categoryQuestions: [
    {
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CategoryQuestion",
        // required: true,
      },
      answer: {
        type: String,
        // required: true,
      },
    },
  ],
});

const productDetailsSchema = new mongoose.Schema({
  productWeight: {
    type: Number,
  },
  productContent: {
    type: String,
  },
  cookingMethod: {
    type: String,
  },
  nutritionalValue: {
    type: String,
  },
  deliveryDetails: {
    type: String,
  },
  productDescription: {
    type: String,
  },
});

const pricingSchema = new mongoose.Schema({
  saleStartDate: {
    type: Date,
  },
  saleEndDate: {
    type: Date,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
  },
});

// const imagesSchema = new mongoose.Schema({

// });

const productSchema = new mongoose.Schema(
  {
    information: {
      type: productInformationSchema,
    },
    details: {
      type: productDetailsSchema,
    },
    pricing: {
      type: pricingSchema,
    },
    images: [
      {
        type: String,
      },
    ],
    approvalStatus: {
      type: String,
      enum: ['pending', 'rejected', 'approved'],
      default: 'pending',
    },
    visibilityStatus: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'inactive',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    avgRating: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = {Product};
