const Tracking = require('../models/Tracking');

exports.createTracking = async (req, res) => {
  try {
    const newTracking = await Tracking.create(req.body);
    return res.status(201).json(newTracking);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getTrackingById = async (req, res) => {
  try {
    const tracking = await Tracking.findById(req.params.id);
    if (!tracking) {
      return res.status(404).json({ message: 'Tracking not found' });
    }
    return res.status(200).json(tracking);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all tracking records
exports.getAllTracking = async (req, res) => {
  try {
    const trackingRecords = await Tracking.find();
    res.status(200).json(trackingRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get tracking records by user ID
exports.getTrackingByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const trackingRecords = await Tracking.find({ user_id: userId });
    res.status(200).json(trackingRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get tracking records by order ID
exports.getTrackingByOrderId = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const trackingRecords = await Tracking.find({ order_id: orderId });
    res.status(200).json(trackingRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.updateTracking = async (req, res) => {
  try {
    const tracking = await Tracking.findById(req.params.id);
    if (!tracking) {
      return res.status(404).json({ message: 'Tracking not found' });
    }
    Object.keys(req.body).forEach(key => {
      tracking[key] = req.body[key];
    });
    await tracking.save();
    return res.status(200).json(tracking);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteTracking = async (req, res) => {
  try {
    const tracking = await Tracking.findByIdAndDelete(req.params.id);
    if (!tracking) {
      return res.status(404).json({ message: 'Tracking not found' });
    }
    return res.status(200).json({ message: 'Tracking deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
