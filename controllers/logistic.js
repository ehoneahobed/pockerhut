const Logistics = require('../models/Logistic');

exports.createLogistics = async (req, res) => {
  try {
    const {
      accountName,
      businessName,
      businessAddress,
      companyRcNumber,
      email,
      state,
      phoneNumber,
      city,
      numberOfVehicles,
      modeOfDelivery,
      yearsOfOperation,
      operationalLicense,
      additionalDocuments,
    } = req.body;

    const logistics = new Logistics({
      accountName,
      businessName,
      businessAddress,
      companyRcNumber,
      email,
      state,
      phoneNumber,
      city,
      numberOfVehicles,
      modeOfDelivery,
      yearsOfOperation,
      operationalLicense,
      additionalDocuments,
      status: 'pending',
    });

    await logistics.save();
    return res.status(201).json(logistics);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAllLogistics = async (req, res) => {
  try {
    const logistics = await Logistics.find();
    return res.status(200).json(logistics);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getLogisticsById = async (req, res) => {
  try {
    const logistics = await Logistics.findById(req.params.id);
    if (!logistics) {
      return res.status(404).json({ message: 'Logistics not found' });
    }
    return res.status(200).json(logistics);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateLogisticsById = async (req, res) => {
  try {
    const {
      accountName,
      businessName,
      businessAddress,
      companyRcNumber,
      email,
      state,
      phoneNumber,
      city,
      numberOfVehicles,
      modeOfDelivery,
      yearsOfOperation,
      operationalLicense,
      additionalDocuments,
      status,
    } = req.body;

    const logistics = await Logistics.findByIdAndUpdate(
      req.params.id,
      {
        accountName,
        businessName,
        businessAddress,
        companyRcNumber,
        email,
        state,
        phoneNumber,
        city,
        numberOfVehicles,
        modeOfDelivery,
        yearsOfOperation,
        operationalLicense,
        additionalDocuments,
        status,
      },
      { new: true }
    );
    if (!logistics) {
      return res.status(404).json({ message: 'Logistics not found' });
    }
    return res.status(200).json(logistics);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteLogisticsById = async (req, res) => {
  try {
    const logistics = await Logistics.findByIdAndDelete(req.params.id);
    if (!logistics) {
      return res.status(404).json({ message: 'Logistics not found' });
    }
    return res.status(200).json({ message: 'Logistics deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
