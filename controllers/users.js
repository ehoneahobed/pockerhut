const User = require("../models/User");
const Billing = require("../models/Billing");
const bcrypt = require("bcrypt");
const emailService = require("../services/email.service");
const crypto = require("crypto");

// update user
exports.updateUser = async (req, res) => {
  if (req.body.password) {
    const saltRounds = 10;
    req.body.password = await bcrypt.hash(req.body.password, saltRounds);
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    // return everything except the password
    const { password, ...others } = updatedUser._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete user
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted successfully!");
  } catch (error) {
    res.status(500).json(error);
  }
};

// get a single user
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('billingInfo');

    // sanitize users and remove their passwords
    const sanitizedUsers = users.map((user) => {
      const { password, ...others } = user._doc;
      return others;
    });

    res.status(200).json(sanitizedUsers);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get admin users
exports.getAdminUsers = async (req, res) => {
  try {
    // Query to find only users with roles 'admin' or 'superadmin'
    const users = await User.find({ role: { $in: ['admin', 'superadmin'] }});

    // Sanitize users and remove their passwords
    const sanitizedUsers = users.map((user) => {
      const { password, ...others } = user._doc;
      return others;
    });

    res.status(200).json(sanitizedUsers);
  } catch (error) {
    res.status(500).json(error);
  }
};

// updating isAccessRevoked
exports.updateAccessRevocation = async (req, res) => {
  const userId = req.params.id; // Assuming the user's ID is passed as a URL parameter
  const { isAccessRevoked } = req.body; // Assuming the new value is sent in the request body

  try {
    // Find the user by ID and update the isAccessRevoked field
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { isAccessRevoked: isAccessRevoked },
      { new: true } // Returns the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Optionally sanitize the output
    const { password, ...sanitizedUser } = updatedUser._doc;

    res.status(200).json({ message: 'User access revocation status updated', user: sanitizedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user access revocation status', error: error });
  }
};

// send email for password reset
exports.sendPasswordResetEmail = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 3600000; // 1 hour from now
    await user.save();

    const resetLink = `${process.env.FRONTEND_BASE_URL}/reset-password/${token}`;
    const emailOptions = {
      to: user.email,
      subject: "Password Reset",
      text: `To reset your password, click the following link: ${resetLink}`,
      html: `<p>To reset your password, click the following link: <a href="${resetLink}">Reset Password</a></p>`,
    };

    // console.log({ emailOptions });

    await emailService.sendEmailWithMailerSend(emailOptions);
    // await emailService.sendEmail(emailOptions);
    res.status(200).json({ message: "Password reset email sent." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "There was an error sending the password reset email." });
  }
};

// reset password endpoint
exports.resetPassword = async (req, res) => {
  const token = req.params.token;
  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiration: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ error: "Token is invalid or has expired." });
  }

  user.password = await bcrypt.hash(req.body.password, 10);
  user.resetToken = undefined;
  user.resetTokenExpiration = undefined;
  await user.save();

  res.status(200).json({ message: "Password has been reset." });
};

// revoke or grant access
exports.updateAccessRevocation = async (req, res) => {
  const userId = req.params.id; // User ID from URL parameter
  const { isAccessRevoked } = req.body; // New access status from the request body

  if (typeof isAccessRevoked !== 'boolean') {
    return res.status(400).json({ message: 'Invalid request format.' });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { isAccessRevoked: isAccessRevoked } },
      { new: true, runValidators: true }
    ).select('-password'); // Exclude password from the result

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Return a success response
    res.status(200).json({ message: 'User access updated successfully.', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user access.', error: error.toString() });
  }
};


// create user billing
// exports.createBilling = async (req, res) => {
//     try {

//         //  check if the optional fields were provided or not
//         const fields = ['contact', 'address_1', 'address_2', 'country', 'state', 'town', 'default'];

//         const data = fields.map(field => {
//             if (req.body.hasOwnProperty(field)) {
//                 return { [field]: req.body[field] };
//             }
//         });

//         user_id = req.user.id;

//         const billingFields = Object.assign({}, ...data, {user_id});
//         const billing = new Billing(billingFields);

//         const savedBilling = await billing.save();

//         res.status(200).json(savedBilling);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// }

// exports.createBilling = async (req, res) => {
//     try {

//         //  check if the optional fields were provided or not
//         const fields = ['contact', 'address_1', 'address_2', 'country', 'state', 'town'];

//         const data = fields.map(field => {
//             if (req.body.hasOwnProperty(field)) {
//                 return { [field]: req.body[field] };
//             }
//         });

//         user_id = req.user.id;

//         const billingFields = Object.assign({}, ...data, {user_id});
//         const billing = new Billing(billingFields);

//         // Check if default billing is set
//         if (req.body.hasOwnProperty('default') && req.body.default === true) {
//             const user = await User.findByIdAndUpdate(user_id, { billing_id: billing._id });
//         }

//         const savedBilling = await billing.save();

//         res.status(200).json(savedBilling);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// }

// // get user billing info
// exports.getUserBilling = async (req, res) => {
//     try {
//         const billing = await User.findOne({ _id: req.params.id }).populate('billing_id');
//         const {password, ...others} = billing.toObject();
//         res.status(200).json(others);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// }

// // update user billing info
// exports.updateBilling = async (req, res) => {
//     try {
//         const billingId = req.params.id;

//         // Find and update the billing document
//         const updatedBilling = await Billing.findByIdAndUpdate(billingId, req.body, {new: true});

//         // Send the updated billing information as a response
//         res.status(200).json(updatedBilling);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// };

// // delete user billing information
// exports.deleteBilling = async (req, res) => {
//     try {
//         const billingId = req.params.id;

//         // Find and delete the billing document
//         await Billing.findByIdAndDelete(billingId);

//         res.status(200).json({ message: "Billing document deleted successfully" });
//     } catch (error) {
//         res.status(500).json(error);
//     }
// };

// // get all users with their respective billing info
// exports.getUsersWithBilling = async (req, res) => {
//     try {
//         // const users = await User.find();
//         const users = await User.find().populate("billing_id");

//         // sanitize users and remove their passwords
//         const sanitizedUsers = users.map(user => {
//             const { password, ...others } = user._doc;
//             return others;
//         })

//         res.status(200).json(sanitizedUsers);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// }

// Create Billing
// exports.createBilling = async (req, res) => {
//   try {
//     const user_id = req.user.id;
//     // console.log(user_id);
//     const billing = new Billing({ ...req.body, user: user_id });
//     const savedBilling = await billing.save();

//     if (req.body.isDefault) {
//       // Set this billing as the default for the user
//       await User.findByIdAndUpdate(user_id, { billing_id: savedBilling._id });
//     }

//     res.status(200).json(savedBilling);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };


// Create Billing
exports.createBilling = async (req, res) => {
  try {
    const user_id = req.user.id;
    const billing = new Billing({ ...req.body, user: user_id });
    console.log(billing);
    const savedBilling = await billing.save();
    
    // Fetch the user and update their billing information
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    // If isDefault is true, set all other billingInfo isDefault to false
    if (req.body.isDefault) {
      user.billingInfo.forEach(billing => {
        if (billing._id != savedBilling._id) {
          // Assuming Billing model has an isDefault field
          Billing.findByIdAndUpdate(billing._id, { isDefault: false }).exec();
        }
      });
    }
    

    // Add the new billing information to the user's billingInfo array
    user.billingInfo.push(savedBilling._id);
    
    // Save the updated user
    await user.save();

    res.status(200).json(savedBilling);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get User Billing
exports.getUserBilling = async (req, res) => {
  try {
    const user_id = req.user.id;
    console.log(user_id);
    const billing = await Billing.find({ user: user_id });
    console.log(billing);
    res.status(200).json({billing});
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update Billing
exports.updateBilling = async (req, res) => {
  try {
    const billingId = req.params.id;
    const updatedBilling = await Billing.findByIdAndUpdate(
      billingId,
      req.body,
      { new: true }
    );

    if (!updatedBilling) {
      return res.status(404).json({ message: "Billing document not found" });
    }

    res.status(200).json(updatedBilling);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete Billing
exports.deleteBilling = async (req, res) => {
  try {
    const billingId = req.params.id;
    const deletedBilling = await Billing.findByIdAndDelete(billingId);

    if (!deletedBilling) {
      return res.status(404).json({ message: "Billing document not found" });
    }

    res.status(200).json({ message: "Billing document deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get Users With Billing (a utility function for sanitization)
const sanitizeUsers = (users) => {
  return users.map((user) => {
    const { password, ...others } = user.toObject();
    return others;
  });
};

// Get All Users With Their Billing Info
exports.getUsersWithBilling = async (req, res) => {
  try {
    const users = await User.find().populate("billingInfo");
    // console.log(users);
    const sanitizedUsers = sanitizeUsers(users);

    res.status(200).json(sanitizedUsers);
  } catch (error) {
    res.status(500).json(error);
  }
};
