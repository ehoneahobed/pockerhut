const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Sorry, this email already exists"]
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String
    },

    // billing_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Billing",
    // },
    billingInfo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Billing",
      }
    ],
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'superadmin'],
      default: 'user'
    },
    isAccessRevoked: { // New field to indicate if access is revoked
      type: Boolean,
      default: true,
    },
    status:{
      type: String,
      enum: ['active', 'inactive'],
      default: 'active'
    },
    resetToken: String,
    resetTokenExpiration: Date,
    lastLogin: Date,
  },
  
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
