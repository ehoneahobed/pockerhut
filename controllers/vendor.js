const Vendor = require("../models/Vendor");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

// Create Vendor
exports.createVendor = async (req, res) => {
  // Validate the request
  if (
    !req.body.sellerAccountInformation ||
    !req.body.businessInformation ||
    !req.body.vendorBankAccount
  ) {
    return res.status(400).send({
      message:
        "Seller account information, business information and vendor bank account are required",
    });
  }
  // Encrypt password using bcrypt
  const password = req.body.sellerAccountInformation.password;
  const salt = await bcrypt.genSalt(saltRounds);
  const encryptedPassword = await bcrypt.hash(password, salt);
  req.body.sellerAccountInformation.password = encryptedPassword;

  // Create a new vendor
  const vendor = new Vendor({
    sellerAccountInformation: req.body.sellerAccountInformation,
    businessInformation: req.body.businessInformation,
    vendorBankAccount: req.body.vendorBankAccount,
    storeStatus: req.body.storeStatus || "pending",
  });

  try {
    // Save the vendor in the database
    const data = await vendor.save();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the vendor.",
    });
  }
};

// login vendor
exports.loginVendor = async (req, res) => {
  // Validate the request
  if (!req.body.email && !req.body.phoneNumber) {
    return res.status(400).send({
      message: "Email or phone number is required",
    });
  }

  if (!req.body.password) {
    return res.status(400).send({
      message: "Password is required",
    });
  }

  try {
    // Check if a vendor exists with the provided email or phone number
    let vendor = null;
    if (req.body.email) {
      vendor = await Vendor.findOne({
        "sellerAccountInformation.email": req.body.email,
      });
    } else {
      vendor = await Vendor.findOne({
        "sellerAccountInformation.phoneNumber": req.body.phoneNumber,
      });
    }

    if (!vendor) {
      return res.status(404).send({
        message: "Vendor not found",
      });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(
      req.body.password,
      vendor.sellerAccountInformation.password
    );
    if (!isMatch) {
      return res.status(401).send({
        message: "Incorrect password",
      });
    }

    // Create a JSON Web Token
    const token = jwt.sign({ id: vendor._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.status(200).send({
      token: token,
      vendor: {
        id: vendor._id,
        shopName: vendor.sellerAccountInformation.shopName,
        entityType: vendor.sellerAccountInformation.entityType,
        email: vendor.sellerAccountInformation.email,
        phoneNumber: vendor.sellerAccountInformation.phoneNumber,
        storeStatus: vendor.storeStatus,
      },
    });
  } catch (err) {
    res.status(500).send({
      message: "An error occurred while logging in the vendor",
    });
  }
};

// Update Vendor
exports.updateVendor = async (req, res) => {
  // Validate the request
  if (
    !req.body.sellerAccountInformation ||
    !req.body.businessInformation ||
    !req.body.vendorBankAccount
  ) {
    return res.status(400).send({
      message:
        "Seller account information, business information and vendor bank account are required",
    });
  }

  // Find the vendor and update it with the request body
  try {
    const vendor = await Vendor.findByIdAndUpdate(
      req.params.vendorId,
      {
        sellerAccountInformation: req.body.sellerAccountInformation,
        businessInformation: req.body.businessInformation,
        vendorBankAccount: req.body.vendorBankAccount,
        storeStatus: req.body.storeStatus || "pending",
      },
      { new: true }
    );
    if (!vendor) {
      return res.status(404).send({
        message: "Vendor not found with id " + req.params.vendorId,
      });
    }
    res.send(vendor);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).send({
        message: "Vendor not found with id " + req.params.vendorId,
      });
    }
    return res.status(500).send({
      message: "Error updating vendor with id " + req.params.vendorId,
    });
  }
};

// delete vendor
exports.deleteVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(req.params.id);
    if (!vendor) return res.status(404).send("Vendor not found");
    res.status(200).send("Vendor deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// get a vendor
exports.getVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).send("Vendor not found");
    res.send(vendor);
  } catch (error) {
    res.status(500).send(error);
  }
};

// get all vendors
exports.getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find({});
    if (!vendors) return res.status(404).send("No vendors found");
    res.send(vendors);
  } catch (error) {
    res.status(500).send(error);
  }
};

// get vendors according to their store approval status
exports.getVendorsByStoreStatus = async (req, res) => {
  try {
    const approvedVendors = await Vendor.find({ storeStatus: "approved" });
    const pendingVendors = await Vendor.find({ storeStatus: "pending" });
    const rejectedVendors = await Vendor.find({ storeStatus: "rejected" });

    res.status(200).json({
      approvedVendors,
      pendingVendors,
      rejectedVendors,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update store status
exports.updateVendorStatus = async (req, res) => {
  // Validate the request
  if (!req.body.storeStatus) {
    return res.status(400).send({
      message: "Vendor store status is required",
    });
  }

  // Find the vendor and update only the storeStatus with the request body
  try {
    const vendor = await Vendor.findByIdAndUpdate(
      req.params.vendorId,
      {
        storeStatus: req.body.storeStatus,
      },
      { new: true }
    );
    if (!vendor) {
      return res.status(404).send({
        message: "Vendor not found with id " + req.params.vendorId,
      });
    }
    res.send(vendor);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).send({
        message: "Vendor not found with id " + req.params.vendorId,
      });
    }
    return res.status(500).send({
      message: "Error updating vendor status with id " + req.params.vendorId,
    });
  }
};
