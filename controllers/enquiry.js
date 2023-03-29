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

    res.status(200).json({ status: "success", message: "Enquiry created successfully" });
  } catch (error) {
    res.status(500).json({ status: "failed", error});
  }
};

// updating an enquiry
// exports.updateEnquiry = async (req, res) => {
//   try {
//     const enquiryId = req.params.id;
//     const updates = req.body;

//     const enquiry = await Enquiry.findByIdAndUpdate(enquiryId, updates, {
//       new: true,
//     });

//     res.status(200).json({ message: "Enquiry updated successfully", enquiry });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

exports.updateEnquiry = async (req, res) => {
  try {
    const enquiryId = req.params.id;

    const enquiry = await Enquiry.findById(enquiryId);
    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }

    enquiry.fullName = req.body.fullName || enquiry.fullName;
    enquiry.email = req.body.email || enquiry.email;
    enquiry.subject = req.body.subject || enquiry.subject;
    enquiry.message = req.body.message || enquiry.message;

    const updatedEnquiry = await enquiry.save();

    res.status(200).json({ status: "success", message: "Enquiry updated successfully", enquiry: updatedEnquiry });
  } catch (error) {
    res.status(500).json({ status: "failed", error});
  }
};


// getting an enquiry
exports.getEnquiry = async (req, res) => {
  try {
    const enquiryId = req.params.id;

    const enquiry = await Enquiry.findById(enquiryId);

    res.status(200).json({ status: "success", enquiry });
  } catch (error) {
    res.status(500).json({status: "failed", error});
  }
};

// get all enquiries submitted
exports.getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
res.status(200).json({ status: "success", enquiries});
  } catch (error) {
    res.status(500).json({ status: "failed", message: "Error fetching enquiries", error });
  }
};

// deleting an enquiry
exports.deleteEnquiry = async (req, res) => {
  try {
    const enquiryId = req.params.id;

    await Enquiry.findByIdAndDelete(enquiryId);

    res.status(200).json({ status: "success", message: "Enquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: "failed", message: "Sorry, the entry couldn't be deleted", error});
  }
};
