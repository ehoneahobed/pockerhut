const Announcement = require("../models/Announcement");
const Vendor = require("../models/Vendor");
const { sendEmail } = require("../services/email.service");
const { announcementEmail } = require("../utils/emailTemplates");

// create new announcement
exports.createAnnouncement = async (req, res) => {
  const { subject, content, startDate, endDate } = req.body;
  try {
    let announcement = new Announcement({
      subject,
      content,
      startDate,
      endDate
    });
    announcement = await announcement.save();
    const vendors = await Vendor.find({ "sellerAccountInformation.email": { $ne: null } });
    for (const vendor of vendors) {
      const fullName = `${
        vendor.sellerAccountInformation.firstName ||
        vendor.businessInformation.businessOwnerName
      } ${vendor.sellerAccountInformation.lastName || ""}`.trim();
      await sendEmail({
        to: vendor.sellerAccountInformation.email,
        subject: "New Announcement",
        html: announcementEmail(fullName, subject, content),
      });
    }
    res.status(200).json({ success: true, announcement });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// update a given announcement
exports.updateAnnouncement = async (req, res) => {
  const { subject, content, expiration } = req.body;
  try {
    let announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      { subject, content, expiration },
      { new: true }
    );
    if (!announcement) {
      return res
        .status(404)
        .json({ success: false, message: "Announcement not found" });
    }
    res.status(200).json({ success: true, announcement });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// delete announcement
exports.deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    await announcement.remove();
    res.json({ message: "Announcement deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting the announcement" });
  }
};

// get all active announcements
exports.getActiveAnnouncements = async (req, res) => {
  try {
    const now = new Date();
    const activeAnnouncements = await Announcement.find({
      expiration: { $gte: now },
    });
    res.status(200).json({ success: true, activeAnnouncements });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// get all announcements
exports.getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find({});
    res.status(200).json({
      success: true,
      count: announcements.length,
      data: announcements,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
