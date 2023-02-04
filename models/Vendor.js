const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VendorSchema = new Schema({
  sellerAccountInformation: {
    shopName: { type: String, required: true },
    entityType: {
      type: String,
      required: true,
      enum: ["individual", "business"],
    },
    accountOwnersName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phoneNumber: { type: String },
    additionalPhoneNumber: String,
    password: { type: String, required: true },
  },
  businessInformation: {
    companyRegisteredName: { type: String },
    address1: { type: String, required: true },
    address2: String,
    city: { type: String, required: true },
    businessOwnerName: { type: String },
    dateOfBirth: { type: String },
    IDType: { type: String },
    IDFile: { type: String },
    CACRegistrationNumber: { type: String },
    CACCertificateFile: { type: String },
    TINCertificateFile: { type: String },
    VATRegistered: { type: String },
  },
  storeStatus: {
    type: String,
    required: true,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  vendorBankAccount: {
    bankName: { type: String },
    accountName: { type: String },
    accountNumber: { type: String },
  },
  profilePhoto: { type: String },
});

module.exports = mongoose.model("Vendor", VendorSchema);
