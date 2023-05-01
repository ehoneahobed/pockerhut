const mongoose = require('mongoose');

const adminRevenueSchema = new mongoose.Schema({
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true
  },
  amountEarned: {
    type: Number,
    required: true
  },
  commissionRate: {
    type: Number,
    required: true
  },
  dateEarned: {
    type: Date,
    default: Date.now
  }
});

const AdminRevenue = mongoose.model('AdminRevenue', adminRevenueSchema);

module.exports = AdminRevenue;
