const mongoose = require('mongoose');

const vetsSchema = new mongoose.Schema({
  accountName: {
    type: String,
    required:[true,"Problem with accountName"]
  },
  businessName: {
    type: String,
    required:[true,"Problem with businessName"]
  },
  businessAddress: {
    type: String,
    required:[true,"Problem with businessAddress"]
  },
  companyRcNumber: {
    type: String,
  },
  email: {
    type: String,
    required:[true,"Email is required"],
    unique: [true, "Sorry, this email already exists"]
  },
  state: {
    type: String,
    required:[true,"Problem with state"]
  },
  phone: {
    type: String,
    required:[true,"Problem with phone"]
  },
  city: {
    type: String,
    required:[true,"Problem with city"]
  },
  vetType: {
    type: String,
    required:[true,"Problem with vetType"]
  },
  yearsOfOperation: {
    type: Number,
    required:[true,"Problem with yearsOfOperation"]
  },
  vetLicense: {
    type: String,
    required:[true,"Problem with vetLicense"]
  },
  additionalDocuments: [{
    type: String,
  }],
  aboutYou: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Vet', vetsSchema);
