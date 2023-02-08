const Agroservice = require("../models/Agroservice");

// create agroservice
exports.createAgroservice = async (req, res) => {
  try {
    const newAgroservice = new Agroservice({
      fullName: req.body.fullName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      subject: req.body.subject,
      message: req.body.message,
    });

    const savedAgroservice = await newAgroservice.save();

    res.status(201).json({
      message: "Agroservice created successfully",
      data: savedAgroservice,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// delete agroservice
exports.deleteAgroservice = async (req, res) => {
  try {
    const agroserviceId = req.params.id;
    await Agroservice.findByIdAndDelete(agroserviceId);
    res.status(200).json({ message: "Agroservice deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

// update agroservice
exports.updateAgroservice = async (req, res) => {
  try {
    const agroserviceId = req.params.id;
    const updatedAgroservice = await Agroservice.findByIdAndUpdate(
      agroserviceId,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({ agroservice: updatedAgroservice });
  } catch (error) {
    res.status(500).json(error);
  }
};

// get single agroservice
exports.getAgroservice = async (req, res) => {
  try {
    const agroserviceId = req.params.id;
    const agroservice = await Agroservice.findById(agroserviceId);
    res.status(200).json({ agroservice });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getAllAgroservices = async (req, res) => {
  try {
    const agroservices = await Agroservice.find().sort({ createdAt: -1 });
    res.status(200).json(agroservices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
