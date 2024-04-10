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
      city: req.body.city,
      address: req.body.address,
    });

    const savedAgroservice = await newAgroservice.save();

    res.status(201).json({
      status: "success",
      message: "Agroservice created successfully",
      data: savedAgroservice,
    });
  } catch (error) {
    res.status(500).json({ status: "failed", error });
  }
};

// delete agroservice
exports.deleteAgroservice = async (req, res) => {
  try {
    const agroserviceId = req.params.id;
    await Agroservice.findByIdAndDelete(agroserviceId);
    res.status(200).json({ status: "success", message: "Agroservice deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: "failed", error});
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
    res.status(200).json({ status: "success", agroservice: updatedAgroservice });
  } catch (error) {
    res.status(500).json({ status: "failed", error});
  }
};

// get single agroservice
exports.getAgroservice = async (req, res) => {
  try {
    const agroserviceId = req.params.id;
    const agroservice = await Agroservice.findById(agroserviceId);
    res.status(200).json({ status: "success", agroservice });
  } catch (error) {
    res.status(500).json({ status: "failed", error});
  }
};

exports.getAllAgroservices = async (req, res) => {
  try {
    const agroservices = await Agroservice.find().sort({ createdAt: -1 });
    res.status(200).json({ status: "success", agroservices});
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};
