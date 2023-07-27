const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    }
  },
  { timestamps: true }
);

// const categorySchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true
//     },
//     description: {
//       type: String
//     },
//     featuredImage: {
//       type: String
//     }
//   },
//   { timestamps: true }
// );

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    featuredImage: {
      type: String,
      required: true
    },
    subcategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subcategory"
      }
    ]
  },
  { timestamps: true }
);


const Category = mongoose.model("Category", categorySchema);
const Subcategory = mongoose.model("Subcategory", subcategorySchema);

module.exports = { Category, Subcategory };
