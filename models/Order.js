// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const OrderSchema = new Schema({
//   customer: {
//     type: Schema.Types.ObjectId,
//     ref: "Customer",
//   },
//   orderDate: {
//     type: Date,
//     default: Date.now,
//   },
//   productDetails: [
//     {
//       productName: {
//         type: Schema.Types.ObjectId,
//         ref: "Product",
//       },
//       quantity: {
//         type: Number,
//         required: true,
//       },
//       price: {
//         type: Number,
//         required: true,
//       },
//       totalPrice: {
//         type: Number,
//         required: true,
//       },
//       vendor: {
//         type: Schema.Types.ObjectId,
//         ref: "Vendor",
//       },
//     },
//   ],
//   subtotal: {
//     type: Number,
//     required: true,
//   },
//   deliveryFee: {
//     type: Number,
//     required: true,
//   },
//   tax: {
//     type: Number,
//   },
//   totalAmount: {
//     type: Number,
//     required: true,
//   },
//   billingInformation: {
//     type: Schema.Types.ObjectId,
//     ref: "BillingInformation",
//   },
//   status: {
//     type: String,
//     enum: ["pending", "readyToGo", "fulfilled", "failed", "completed"],
//     default: "pending",
//   },
// });

// const Order = mongoose.model("Order", OrderSchema);

// module.exports = Order;


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  productDetails: [
    {
      productName: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      totalPrice: {
        type: Number,
        required: true,
      },
      vendor: {
        type: Schema.Types.ObjectId,
        ref: "Vendor",
      },
      deliveryFeePerProduct: {
        type: Number
      },
    },
  ],
  subtotal: {
    type: Number,
    required: true,
  },
  tax: {
    type: Number,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  billingInformation: {
    type: Schema.Types.ObjectId,
    ref: "BillingInformation",
  },
  status: {
    type: String,
    enum: ["pending", "readyToGo", "fulfilled", "failed", "completed"],
    default: "pending",
  },
  isPaid: {
    type: Boolean,
    default: false
  }
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
