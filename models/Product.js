const mongoose = require("mongoose");

const productInformationSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productBreed: {
    type: String,
  },
  typeOfMeat: {
    type: String,
  },
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
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
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
      type: Boolean,
      default: false,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
