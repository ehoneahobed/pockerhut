const Enquiry = require("../models/Enquiry");

// creating enquiry
exports.createEnquiry = async (req, res) => {
  try {
    const { fullName, email, subject, message } = req.body;

    const enquiry = new Enquiry({
      fullName,
      email,
      subject,
      message,
    });

    await enquiry.save();

    res.status(200).json({ message: "Enquiry created successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

// updating an enquiry
exports.updateEnquiry = async (req, res) => {
  try {
    const enquiryId = req.params.id;
    const updates = req.body;

    const enquiry = await Enquiry.findByIdAndUpdate(enquiryId, updates, {
      new: true,
    });

    res.status(200).json({ message: "Enquiry updated successfully", enquiry });
  } catch (error) {
    res.status(500).json(error);
  }
};

// getting an enquiry
exports.getEnquiry = async (req, res) => {
  try {
    const enquiryId = req.params.id;

    const enquiry = await Enquiry.findById(enquiryId);

    res.status(200).json({ enquiry });
  } catch (error) {
    res.status(500).json(error);
  }
};

// get all enquiries submitted
exports.getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.status(200).json(enquiries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching enquiries" });
  }
};

// deleting an enquiry
exports.deleteEnquiry = async (req, res) => {
  try {
    const enquiryId = req.params.id;

    await Enquiry.findByIdAndDelete(enquiryId);

    res.status(200).json({ message: "Enquiry deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};
