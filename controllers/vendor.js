const Vendor = require("../models/Vendor");
const VendorAccount = require("../models/VendorAccount");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const emailService = require("../services/email.service");

// Create Vendor
// exports.createVendor = async (req, res) => {
//   // Validate the request
//   if (
//     !req.body.sellerAccountInformation ||
//     !req.body.businessInformation ||
//     !req.body.vendorBankAccount
//   ) {
//     return res.status(400).send({
//       message:
//         "Seller account information, business information and vendor bank account are required",
//     });
//   }

//   // Get the uploaded file information
//   const IDFile = req.file && req.file.fieldname === 'IDFile' && req.file.filename ? req.file.filename : '';
//   const CACCertificateFile = req.file && req.file.fieldname === 'CACCertificateFile' && req.file.filename ? req.file.filename : '';
//   const TINCertificateFile = req.file && req.file.fieldname === 'TINCertificateFile' && req.file.filename ? req.file.filename : '';
//   const profilePhoto = req.file && req.file.fieldname === 'profilePhoto' && req.file.filename ? req.file.filename : '';

//   // Update the businessInformation with the file information
//   req.body.businessInformation.IDFile = IDFile;
//   req.body.businessInformation.CACCertificateFile = CACCertificateFile;
//   req.body.businessInformation.TINCertificateFile = TINCertificateFile;

//   // Update the profilePhoto with the file information
//   req.body.profilePhoto = profilePhoto;

//   // Encrypt password using bcrypt
//   const password = req.body.sellerAccountInformation.password;
//   const salt = await bcrypt.genSalt(saltRounds);
//   const encryptedPassword = await bcrypt.hash(password, salt);
//   req.body.sellerAccountInformation.password = encryptedPassword;

//   // Create a new vendor
//   const vendor = new Vendor({
//     sellerAccountInformation: req.body.sellerAccountInformation,
//     businessInformation: req.body.businessInformation,
//     vendorBankAccount: req.body.vendorBankAccount,
//     storeStatus: req.body.storeStatus || "pending",
//     profilePhoto: req.body.profilePhoto,
//   });

//   try {
//     // Save the vendor in the database
//     const data = await vendor.save();
//     res.send(data);
//   } catch (err) {
//     res.status(500).send({
//       message: err.message || "Some error occurred while creating the vendor.",
//     });
//   }
// };

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

  // Get the uploaded file information
  const IDFile = req.body.vendorFiles.IDFile || "";
  const CACCertificateFile = req.body.vendorFiles.CACCertificateFile || "";
  const TINCertificateFile = req.body.vendorFiles.TINCertificateFile || "";
  const profilePhoto = req.body.vendorFiles.profilePhoto || "";


  // Update the businessInformation with the file information
  req.body.businessInformation.IDFile = IDFile;
  req.body.businessInformation.CACCertificateFile = CACCertificateFile;
  req.body.businessInformation.TINCertificateFile = TINCertificateFile;

  // // Update the profilePhoto with the file information
  // req.body.profilePhoto = profilePhoto;

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
    profilePhoto: profilePhoto,
    pickupAddresses: req.body.pickupAddresses || [],
  });

  try {
    // Save the vendor in the database
    const data = await vendor.save();
     // Exclude the password from the returned payload
     const responseData = data.toObject();
     delete responseData.sellerAccountInformation.password;

    res.send(responseData);
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

    // res.status(200).send({
    //   token: token,
    //   vendor: {
    //     id: vendor._id,
    //     shopName: vendor.sellerAccountInformation.shopName,
    //     entityType: vendor.sellerAccountInformation.entityType,
    //     email: vendor.sellerAccountInformation.email,
    //     phoneNumber: vendor.sellerAccountInformation.phoneNumber,
    //     storeStatus: vendor.storeStatus,
    //   },
    // });

    // TO DO: remove password before returning the vendor obbject
    res.status(200).send({
      token: token,
      vendor: vendor,
    });

  } catch (err) {
    res.status(500).send({
      message: "An error occurred while logging in the vendor",
    });
  }
};

// Update Vendor
// exports.updateVendor = async (req, res) => {
//   // Validate the request
//   if (
//     !req.body.sellerAccountInformation ||
//     !req.body.businessInformation ||
//     !req.body.vendorBankAccount
//   ) {
//     return res.status(400).send({
//       message:
//         "Seller account information, business information and vendor bank account are required",
//     });
//   }

//   // Find the vendor and update it with the request body
//   try {
//     const vendor = await Vendor.findByIdAndUpdate(
//       req.params.vendorId,
//       {
//         sellerAccountInformation: req.body.sellerAccountInformation,
//         businessInformation: req.body.businessInformation,
//         vendorBankAccount: req.body.vendorBankAccount,
//         storeStatus: req.body.storeStatus || "pending",
//       },
//       { new: true }
//     );
//     if (!vendor) {
//       return res.status(404).send({
//         message: "Vendor not found with id " + req.params.vendorId,
//       });
//     }
//     res.send(vendor);
//   } catch (err) {
//     if (err.kind === "ObjectId") {
//       return res.status(404).send({
//         message: "Vendor not found with id " + req.params.vendorId,
//       });
//     }
//     return res.status(500).send({
//       message: "Error updating vendor with id " + req.params.vendorId,
//     });
//   }
// };

// exports.updateVendor = async (req, res) => {
//   // Validate the request
//   if (
//     !req.body.sellerAccountInformation ||
//     !req.body.businessInformation ||
//     !req.body.vendorBankAccount
//   ) {
//     return res.status(400).send({
//       message:
//         "Seller account information, business information, and vendor bank account are required",
//     });
//   }

//   // Get the uploaded file information
//   const IDFile = req.body.vendorFiles.IDFile || "";
//   const CACCertificateFile = req.body.vendorFiles.CACCertificateFile || "";
//   const TINCertificateFile = req.body.vendorFiles.TINCertificateFile || "";
//   const profilePhoto = req.body.vendorFiles.profilePhoto || "";

//   // Update the businessInformation with the file information
//   req.body.businessInformation.IDFile = IDFile;
//   req.body.businessInformation.CACCertificateFile = CACCertificateFile;
//   req.body.businessInformation.TINCertificateFile = TINCertificateFile;

//   // Encrypt password using bcrypt
//   if (req.body.sellerAccountInformation.password) {
//     const password = req.body.sellerAccountInformation.password;
//     const salt = await bcrypt.genSalt(saltRounds);
//     const encryptedPassword = await bcrypt.hash(password, salt);
//     req.body.sellerAccountInformation.password = encryptedPassword;
//   }

//   // Find the vendor and update it with the request body
//   try {
//     const vendor = await Vendor.findByIdAndUpdate(
//       req.params.vendorId,
//       {
//         sellerAccountInformation: req.body.sellerAccountInformation,
//         businessInformation: req.body.businessInformation,
//         vendorBankAccount: req.body.vendorBankAccount,
//         storeStatus: req.body.storeStatus || "pending",
//         profilePhoto: profilePhoto,
//       },
//       { new: true }
//     );
//     if (!vendor) {
//       return res.status(404).send({
//         message: "Vendor not found with id " + req.params.vendorId,
//       });
//     }

//     // Exclude the password from the returned payload
//     const responseData = vendor.toObject();
//     delete responseData.sellerAccountInformation.password;

//     res.send(responseData);
//   } catch (err) {
//     if (err.kind === "ObjectId") {
//       return res.status(404).send({
//         message: "Vendor not found with id " + req.params.vendorId,
//       });
//     }
//     return res.status(500).send({
//       message: "Error updating vendor with id " + req.params.vendorId,
//     });
//   }
// };

exports.updateVendor = async (req, res) => {
  // Validate the request
  if (
    !req.body.sellerAccountInformation ||
    !req.body.businessInformation ||
    !req.body.vendorBankAccount
  ) {
    return res.status(400).send({
      message:
        "Seller account information, business information, and vendor bank account are required",
    });
  }

  // Get the uploaded file information
  const IDFile = req.body.vendorFiles.IDFile || "";
  const CACCertificateFile = req.body.vendorFiles.CACCertificateFile || "";
  const TINCertificateFile = req.body.vendorFiles.TINCertificateFile || "";
  const profilePhoto = req.body.vendorFiles.profilePhoto || "";

  // Update the businessInformation with the file information
  req.body.businessInformation.IDFile = IDFile;
  req.body.businessInformation.CACCertificateFile = CACCertificateFile;
  req.body.businessInformation.TINCertificateFile = TINCertificateFile;

  // Encrypt password using bcrypt
  if (req.body.sellerAccountInformation.password) {
    const password = req.body.sellerAccountInformation.password;
    const salt = await bcrypt.genSalt(saltRounds);
    const encryptedPassword = await bcrypt.hash(password, salt);
    req.body.sellerAccountInformation.password = encryptedPassword;
  }

  // Prepare the update object
  const updateObject = {
    sellerAccountInformation: req.body.sellerAccountInformation,
    businessInformation: req.body.businessInformation,
    vendorBankAccount: req.body.vendorBankAccount,
    storeStatus: req.body.storeStatus || "pending",
    profilePhoto: profilePhoto,
  };

  // Include pickupAddresses in the update if provided
  if (req.body.pickupAddresses) {
    updateObject.pickupAddresses = req.body.pickupAddresses;
  }

  // Find the vendor and update it with the update object
  try {
    const vendor = await Vendor.findByIdAndUpdate(
      req.params.vendorId,
      updateObject,
      { new: true }
    );
    if (!vendor) {
      return res.status(404).send({
        message: "Vendor not found with id " + req.params.vendorId,
      });
    }

    // Exclude the password from the returned payload
    const responseData = vendor.toObject();
    delete responseData.sellerAccountInformation.password;

    res.send(responseData);
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
// exports.deleteVendor = async (req, res) => {
//   try {
//     const vendor = await Vendor.findByIdAndDelete(req.params.id);
//     if (!vendor) return res.status(404).send("Vendor not found");
//     res.status(200).send("Vendor deleted successfully");
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };


const cloudinary = require('../utils/cloudinary');

// Delete Vendor
exports.deleteVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(req.params.id);
    if (!vendor) return res.status(404).send("Vendor not found");

    // Extract the public IDs from the URLs
    const publicIds = [];
    if (vendor.profilePhoto) {
      const profilePhotoPublicId = extractPublicId(vendor.profilePhoto);
      if (profilePhotoPublicId) publicIds.push(profilePhotoPublicId);
    }
    if (vendor.businessInformation) {
      const { IDFile, CACCertificateFile, TINCertificateFile } = vendor.businessInformation;
      if (IDFile) {
        const IDFilePublicId = extractPublicId(IDFile);
        if (IDFilePublicId) publicIds.push(IDFilePublicId);
      }
      if (CACCertificateFile) {
        const CACCertificateFilePublicId = extractPublicId(CACCertificateFile);
        if (CACCertificateFilePublicId) publicIds.push(CACCertificateFilePublicId);
      }
      if (TINCertificateFile) {
        const TINCertificateFilePublicId = extractPublicId(TINCertificateFile);
        if (TINCertificateFilePublicId) publicIds.push(TINCertificateFilePublicId);
      }
    }

    // Delete the associated files in Cloudinary
    // if (publicIds.length > 0) {
    //   await Promise.all(
    //     publicIds.map(async (publicId) => {
    //       await cloudinary.uploader.destroy(publicId);
    //     })
    //   );
    // }

    if (publicIds.length > 0) {
      await Promise.all(
        publicIds.map((publicId) =>
          new Promise((resolve, reject) => {
            cloudinary.uploader.destroy(publicId, (error, result) => {
              if (error) {
                reject(error);
                console.log(error);
              } else {
                resolve(result);
                console.log(result);
              }
            });
          })
        )
      );
    }

    console.log(publicIds);

    res.status(200).send("Vendor deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Function to extract the public ID from the Cloudinary URL
function extractPublicId(url) {
  const regex = /\/v\d+\/(.+)$/i;
  const matches = url.match(regex);
  if (matches && matches.length >= 2) {
    return matches[1];
  }
  return null;
}


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


// send email for password reset
exports.sendPasswordResetEmail = async (req, res) => {
  try {
    const email = req.body.email;
    const vendor = await Vendor.findOne({ "sellerAccountInformation.email": email });

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found." });
    }

    const token = crypto.randomBytes(32).toString("hex");
    vendor.resetToken = token;
    vendor.resetTokenExpiration = Date.now() + 3600000; // 1 hour from now
    await vendor.save();

    const resetLink = `${process.env.FRONTEND_BASE_URL}/vendor/reset-password/${token}`;
    const emailOptions = {
      to: vendor.sellerAccountInformation.email,
      subject: "Password Reset",
      text: `To reset your password, click the following link: ${resetLink}`,
      
    };

    console.log({ emailOptions });

    await emailService.sendEmail(emailOptions);
    res.status(200).json({ message: "Password reset email sent." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "There was an error sending the password reset email." });
  }
};

// reset password endpoint
exports.resetPassword = async (req, res) => {
  const token = req.params.token;
  const vendor = await Vendor.findOne({
    resetToken: token,
    resetTokenExpiration: { $gt: Date.now() },
  });

  if (!vendor) {
    return res.status(400).json({ error: "Token is invalid or has expired." });
  }

  user.password = await bcrypt.hash(req.body.password, 10);
  user.resetToken = undefined;
  user.resetTokenExpiration = undefined;
  await user.save();

  res.status(200).json({ message: "Password has been reset." });
};


exports.getAllVendorAccounts = async (req, res) => {
  try {
    const vendorAccountsAggregated = await VendorAccount.aggregate([
      {
        $lookup: {
          from: "orders", // the collection to join
          localField: "orderId", // field from the input documents
          foreignField: "_id", // field from the documents of the "from" collection
          as: "orderDetails" // array field in the input document
        }
      },
      {
        $unwind: "$orderDetails" // Deconstructs the array field from the input document to output a document for each element
      },
      {
        $group: {
          _id: "$vendorId",
          totalOrders: { $sum: 1 },
          totalFailedOrders: {
            $sum: {
              $cond: [{ $eq: ["$orderDetails.status", "failed"] }, 1, 0]
            }
          },
          // You can add more metrics here as needed
        }
      }
    ]);

    if (!vendorAccountsAggregated.length) return res.status(404).send("No vendor accounts data found.");
    res.send(vendorAccountsAggregated);
  } catch (error) {
    res.status(500).send(error);
  }
};
