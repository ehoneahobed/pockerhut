const mongoose = require("mongoose");

const vendorWalletSchema = new mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    balance: {
      type: Number,
      required: true,
      default: 0,
    },
    previousPayments: [
      {
        paymentAmount: {
          type: Number,
          required: true,
        },
        paymentDate: {
          type: Date,
          required: true,
        },
        paymentMethod: {
          type: String,
          required: true,
        },
        paymentStatus: {
          type: String,
          enum: ["pending", "paid"],
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("VendorWallet", vendorWalletSchema);
