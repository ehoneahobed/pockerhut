const WeekendKills = require("../models/WeekendKills");

// Create WeekendKills request
exports.createWeekendKills = async (req, res) => {
  try {
    const weekendKills = new WeekendKills({
      fullName: req.body.fullName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      subject: req.body.subject,
      message: req.body.message,
    });

    const savedWeekendKills = await weekendKills.save();
    res.status(201).json({ status: "success", savedWeekendKills});
  } catch (error) {
    res.status(500).json({ status: "failed", error: error.message });
  }
};

// Delete WeekendKills request
exports.deleteWeekendKills = async (req, res) => {
  try {
    const deletedWeekendKills = await WeekendKills.findByIdAndDelete(
      req.params.id
    );
    if (!deletedWeekendKills)
      return res.status(404).json({ error: "WeekendKills request not found" });

    res.status(200).json({ status: "success", deletedWeekendKills});
  } catch (error) {
    res.status(500).json({ status: "failed", error: error.message });
  }
};

// Update WeekendKills request
exports.updateWeekendKills = async (req, res) => {
  try {
    const updatedWeekendKills = await WeekendKills.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    if (!updatedWeekendKills)
      return res.status(404).json({ status: "failed", error: "WeekendKills request not found" });

    res.status(200).json({ status: "success", updatedWeekendKills});
  } catch (error) {
    res.status(500).json({ status: "failed", error: error.message });
  }
};

// Get single WeekendKills request
exports.getWeekendKills = async (req, res) => {
  try {
    const weekendKills = await WeekendKills.findById(req.params.id);
    if (!weekendKills)
      return res.status(404).json({ status: "failed", error: "WeekendKills request not found" });

    res.status(200).json({ status: "success", weekendKills});
  } catch (error) {
    res.status(500).json({ status: "failed", error: error.message });
  }
};

// Get all WeekendKills requests
exports.getAllWeekendKills = async (req, res) => {
  try {
    const weekendKills = await WeekendKills.find({}).sort({ createdAt: -1 });
    res.status(200).json({ status: "success", weekendKills});
  } catch (error) {
    res.status(500).json({ status: "failed", error: error.message });
  }
};
