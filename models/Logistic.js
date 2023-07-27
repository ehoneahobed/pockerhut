const mongoose = require('mongoose');

const logisticsSchema = new mongoose.Schema({
  accountName: {
    type: String,
    required: true,
  },
  businessName: {
    type: String,
    required: true,
  },
  businessAddress: {
    type: String,
    required: true,
  },
  companyRcNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Sorry, this email already exists"]
  },
  state: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  numberOfVehicles: {
    type: Number,
    required: true,
  },
  modeOfDelivery: {
    type: String,
    required: true,
  },
  yearsOfOperation: {
    type: Number,
    required: true,
  },
  operationalLicense: {
    type: String,
    required: true,
  },
  additionalDocuments: [
    {
      type: String,
      required: true,
    },
  ],
  status: {
    type: String,
    required: true,
    default: 'Pending',
  },
});

module.exports = mongoose.model('Logistics', logisticsSchema);
