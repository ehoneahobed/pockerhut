const Vendor = require("../models/Vetservice");

// create a new vetservice
exports.createVetservice = async (req, res) => {
  try {
    const vetservice = new Vetservice(req.body);
    await vetservice.save();
    res
      .status(200)
      .json({ message: "Vetservice request submitted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete a specific vetservice
exports.deleteVetservice = async (req, res) => {
  try {
    const id = req.params.id;
    await Vetservice.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Vetservice request deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

// update a specific vetservice
exports.updateVetservice = async (req, res) => {
  try {
    const id = req.params.id;
    await Vetservice.findByIdAndUpdate(id, req.body, { new: true });
    res
      .status(200)
      .json({ message: "Vetservice request updated successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

// get a specific vetservice
exports.getVetservice = async (req, res) => {
  try {
    const id = req.params.id;
    const vetservice = await Vetservice.findById(id);
    res.status(200).json(vetservice);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get all vetservice requests
exports.getAllVetservices = async (req, res) => {
  try {
    const vetservices = await Vetservice.find({});
    res.status(200).json(vetservices);
  } catch (error) {
    res.status(500).json(error);
  }
};
