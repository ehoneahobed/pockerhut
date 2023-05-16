const mongoose = require('mongoose');

const vetsSchema = new mongoose.Schema({
  accountName: {
    type: String,
    required: true
  },
  businessName: {
    type: String,
    required: true
  },
  businessAddress: {
    type: String,
    required: true
  },
  companyRcNumber: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  state: {
    type: String,
    required: true
  },
  phone: {
    type: String,
  },
  city: {
    type: String,
  },
  vetType: {
    type: String
  },
  yearsOfOperation: {
    type: Number
  },
  vetLicense: {
    type: String
  },
  additionalDocuments: [{
    type: String
  }],
  aboutYou: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Vet', vetsSchema);
