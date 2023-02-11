const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema(
  {
    contact: {
      type: String,
    },
    address_1: {
      type: String,
      required: true,
      unique: true,
    },
    address_2: {
      type: String,
    },
    country: {
      type: String,
    },

    state: {
      type: String,
    },
    town: {
      type: String,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Billing", billingSchema);
