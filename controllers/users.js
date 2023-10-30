const User = require("../models/User");
const Billing = require("../models/Billing");
const bcrypt = require("bcrypt");
const emailService = require("../services/emailService");
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
    const users = await User.find();

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

// send email for password reset
exports.sendPasswordResetEmail = async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  const token = crypto.randomBytes(32).toString("hex");
  user.resetToken = token;
  user.resetTokenExpiration = Date.now() + 3600000; // 1 hour from now
  await user.save();

  const emailOptions = {
    to: user.email,
    subject: "Password Reset",
    text: `To reset your password, click the following link: http://porkethut.com/reset-password/${token}`,
    html: `<b>To reset your password, click the following link: </b><a href="http://porkethut.com/reset-password/${token}">Reset Password</a>`,
  };

  await emailService.sendEmail(emailOptions);

  res.status(200).json({ message: "Password reset email sent." });
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
exports.createBilling = async (req, res) => {
  try {
    const user_id = req.user.id;
    const billing = new Billing({ ...req.body, user_id });
    const savedBilling = await billing.save();

    if (req.body.default) {
      // Set this billing as the default for the user
      await User.findByIdAndUpdate(user_id, { billing_id: savedBilling._id });
    }

    res.status(200).json(savedBilling);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get User Billing
exports.getUserBilling = async (req, res) => {
  try {
    const user_id = req.user.id;
    const billing = await Billing.findOne({ user: user_id });
    res.status(200).json(billing);
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
    const users = await User.find().populate("billing_id");
    const sanitizedUsers = sanitizeUsers(users);

    res.status(200).json(sanitizedUsers);
  } catch (error) {
    res.status(500).json(error);
  }
};
