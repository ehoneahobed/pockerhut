const mongoose = require('mongoose');

const vendorNotificationSettingsSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, 'Please provide a valid email address'],
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('VendorNotificationSettings', vendorNotificationSettingsSchema);
