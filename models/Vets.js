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
    required:[true,"Problem with companyRcNumber"]
  },
  email: {
    type: String,
    required:[true,"Problem with email"],
    unique: true
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
    required:[true,"Problem with additionalDocuments"]
  }],
  aboutYou: {
    type: String,
    required:[true,"Problem with aboutYou"]
  },
  status: {
    type: String,
    required:[true,"Problem with status"],
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Vet', vetsSchema);
