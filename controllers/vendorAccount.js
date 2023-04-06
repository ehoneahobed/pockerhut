const VendorAccount = require('../models/VendorAccount');
const { updateVendorWalletBalanceById } = require('./vendorWallet');

// Create new vendor account
exports.createVendorAccount = async (req, res) => {
    try {
      const vendorAccount = await VendorAccount.create(req.body);
      res.status(201).json({ status: 'success', vendorAccount });
    } catch (error) {
      res.status(500).json({ status: 'error', error: error.message });
    }
  };

//   Get vendor account by ID
exports.getVendorAccountById = async (req, res) => {
    try {
      const vendorAccount = await VendorAccount.findById(req.params.id)
        .populate('vendorId')
        .populate('orderId')
        .populate('productId');
      if (!vendorAccount) {
        return res.status(404).json({ error: 'Vendor account not found' });
      }
      res.status(200).json({ status: 'success', vendorAccount });
    } catch (error) {
      res.status(500).json({ status: 'error', error: error.message });
    }
  };

// Get vendor accounts by vendor ID
exports.getVendorAccountsByVendorId = async (req, res) => {
    try {
      const vendorAccounts = await VendorAccount.find({
        vendorId: req.params.vendorId,
      })
        .populate('vendorId')
        .populate('orderId')
        .populate('productId');
      res.status(200).json({ status: 'success', vendorAccounts });
    } catch (error) {
      res.status(500).json({ status: 'error', error: error.message });
    }
  };

// Get vendor accounts by order ID
exports.getVendorAccountsByOrderId = async (req, res) => {
    try {
      const vendorAccounts = await VendorAccount.find({
        orderId: req.params.orderId,
      })
        .populate('vendorId')
        .populate('orderId')
        .populate('productId');
      res.status(200).json({ status: 'success', vendorAccounts });
    } catch (error) {
      res.status(500).json({ status: 'error', error: error.message });
    }
  };


// Update vendor account
exports.updateVendorAccount = async (req, res) => {
    try {
      const vendorAccount = await VendorAccount.findById(req.params.id);
      if (!vendorAccount) {
        return res.status(404).json({ error: 'Vendor account not found' });
      }
      Object.assign(vendorAccount, req.body);
      await vendorAccount.save();
      res.status(200).json({ status: 'success', vendorAccount });
    } catch (error) {
      res.status(500).json({ status: 'error', error: error.message });
    }
  };

// Delete vendor account
exports.deleteVendorAccount = async (req, res) => {
    try {
      const vendorAccount = await VendorAccount.findByIdAndDelete(req.params.id);
      if (!vendorAccount) {
        return res.status(404).json({ error: 'Vendor account not found' });
      }
      res.status(204).json({ status: 'success', data: null });
    } catch (error) {
      res.status(500).json({ status: 'error', error: error.message });
    }
  };
  
  // Create new vendor account for a purchase
exports.createVendorAccount = async (req, res) => {
    try {
      const { vendorId, orderId, productId, amount } = req.body;
      const vendorAccount = await VendorAccount.create({
        vendorId,
        orderId,
        productId,
        amount
      });
      await updateVendorWalletBalanceById(vendorId, amount, false);
      res.status(201).json({ status: 'success', vendorAccount });
    } catch (error) {
      res.status(500).json({ status: 'error', error: error.message });
    }
  };
  
  // Create new vendor account for a refund
  exports.createVendorAccountRefund = async (req, res) => {
    try {
      const { vendorId, orderId, productId, amount } = req.body;
      const vendorAccount = await VendorAccount.create({
        vendorId,
        orderId,
        productId,
        amount,
        isRefund: true
      });
      await updateVendorWalletBalanceById(vendorId, amount, true);
      res.status(201).json({ status: 'success', vendorAccount });
    } catch (error) {
      res.status(500).json({ status: 'error', error: error.message });
    }
  };
  