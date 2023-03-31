// Create new vendor wallet
exports.createVendorWallet = async (req, res) => {
    try {
      const vendorWallet = await VendorWallet.create(req.body);
      res.status(201).json({ status: 'success', vendorWallet });
    } catch (error) {
      res.status(500).json({ status: 'error', error: error.message });
    }
  };
  
// Get vendor wallet by vendor ID
exports.getVendorWalletByVendorId = async (req, res) => {
    try {
      const vendorWallet = await VendorWallet.findOne({
        vendorId: req.params.vendorId,
      });
      res.status(200).json({ status: 'success', vendorWallet });
    } catch (error) {
      res.status(500).json({ status: 'error', error: error.message });
    }
  };

// Update vendor wallet balance
exports.updateVendorWalletBalance = async (req, res) => {
    try {
      const vendorWallet = await VendorWallet.findOne({
        vendorId: req.params.vendorId,
      });
      const { paymentAmount } = req.body;
      vendorWallet.balance += paymentAmount;
      await vendorWallet.save();
      res.status(200).json({ status: 'success', vendorWallet });
    } catch (error) {
      res.status(500).json({ status: 'error', error: error.message });
    }
  };

// Add previous payment to vendor wallet
exports.addPreviousPaymentToVendorWallet = async (req, res) => {
    try {
      const vendorWallet = await VendorWallet.findOne({
        vendorId: req.params.vendorId,
      });
      vendorWallet.previousPayments.push(req.body);
      await vendorWallet.save();
      res.status(200).json({ status: 'success', vendorWallet });
    } catch (error) {
      res.status(500).json({ status: 'error', error: error.message });
    }
  };

//   Get vendor wallet balance
exports.getVendorWalletBalance = async (req, res) => {
    try {
      const vendorId = req.params.vendorId;
      const vendorWallet = await VendorWallet.findOne({ vendorId });
      if (!vendorWallet) {
        return res.status(404).json({ error: "Vendor wallet not found" });
      }
      res.status(200).json({ balance: vendorWallet.balance });
    } catch (error) {
      res.status(500).json(error);
    }
  };

//   Add payment to vendor wallet
exports.addPaymentToVendorWallet = async (req, res) => {
    try {
      const vendorId = req.params.vendorId;
      const { paymentAmount, paymentMethod } = req.body;
      const vendorWallet = await VendorWallet.findOneAndUpdate(
        { vendorId },
        {
          $inc: { balance: paymentAmount },
          $push: {
            previousPayments: {
              paymentAmount,
              paymentDate: new Date(),
              paymentMethod,
              paymentStatus: "paid",
            },
          },
        },
        { new: true }
      );
      res.status(200).json({ vendorWallet });
    } catch (error) {
      res.status(500).json(error);
    }
  };

//   Get previous payments
exports.getPreviousPayments = async (req, res) => {
    try {
      const vendorId = req.params.vendorId;
      const vendorWallet = await VendorWallet.findOne({ vendorId });
      if (!vendorWallet) {
        return res.status(404).json({ error: "Vendor wallet not found" });
      }
      const previousPayments = vendorWallet.previousPayments;
      res.status(200).json({ previousPayments });
    } catch (error) {
      res.status(500).json(error);
    }
  };
  