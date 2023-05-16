const VendorNotificationSettings = require('../models/NotificationSetting');

exports.createVendorNotificationSetting = async (req, res) => {
  try {
    const { type, email, status } = req.body;
    const setting = await VendorNotificationSettings.create({ type, email, status });
    return res.status(201).json(setting);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getVendorNotificationSettings = async (req, res) => {
  try {
    const settings = await VendorNotificationSettings.find();
    return res.status(200).json(settings);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getVendorNotificationSettingById = async (req, res) => {
  try {
    const setting = await VendorNotificationSettings.findById(req.params.id);
    if (!setting) {
      return res.status(404).json({ message: 'Setting not found' });
    }
    return res.status(200).json(setting);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateVendorNotificationSetting = async (req, res) => {
  try {
    const { type, email, status } = req.body;
    const setting = await VendorNotificationSettings.findByIdAndUpdate(
      req.params.id,
      { type, email, status },
      { new: true }
    );
    if (!setting) {
      return res.status(404).json({ message: 'Setting not found' });
    }
    return res.status(200).json(setting);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteVendorNotificationSetting = async (req, res) => {
  try {
    const setting = await VendorNotificationSettings.findByIdAndDelete(req.params.id);
    if (!setting) {
      return res.status(404).json({ message: 'Setting not found' });
    }
    return res.status(200).json({ message: 'Setting deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
