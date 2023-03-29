const mongoose = require("mongoose");

const trackingSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  order_date: { type: Date, required: true },
  pending_confirmation_date: { type: Date },
  shipping_date: { type: Date },
  delivery_date: { type: Date },
  current_status: {
    type: String,
    enum: ["order placed", "pending confirmation", "shipped", "delivered"],
    required: true,
  },
},
{ timestamps: true });

const Tracking = mongoose.model("Tracking", trackingSchema);

module.exports = Tracking;
