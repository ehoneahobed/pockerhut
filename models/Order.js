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
//       productID: {
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
//       deliveryFeePerProduct: {
//         type: Number
//       },
//       pickup: {
//         type: Boolean,
//         default: false,
//       }
//     },
//   ],
//   subtotal: {
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
//   isPaid: {
//     type: Boolean,
//     default: false
//   }
// });

// const Order = mongoose.model("Order", OrderSchema);

// module.exports = Order;


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductDetailSchema = new Schema({
  productID: {
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
  deliveryOption: {
    type: String,
    enum: ["pickup", "delivery"],
    required: true
  },
  pickupAddress: {
    type: String,
    required: function() { return this.deliveryOption === 'pickup'; }
  },
  orderNotes: {
    type: String,
  }
});

const OrderSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  productDetails: [ProductDetailSchema],
  subtotal: {
    type: Number,
    required: true,
  },
  tax: {
    type: Number,
  },
  reason:{
    type: String,
    required: false
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  billingInformation: {
    type: Schema.Types.ObjectId,
    ref: "Billing",
  },
  status: {
    type: String,
    enum: ["pending", "readyToGo", "failed", "completed"],
    default: "pending",
  },
  isPaid: {
    type: Boolean,
    default: false
  }
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
