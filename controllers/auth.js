const bcrypt = require("bcrypt");
const User = require("../models/User");
const Invitation = require("../models/AdminInvitation");
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const { sendInvitationEmail } = require('../services/email.service');

exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber, role, isAccessRevoked, invitationToken } = req.body;

       // Restrict registration for admin or superadmin roles to those with a valid invitation token
       if (role === 'admin' || role === 'superadmin') {
        if (!invitationToken) {
          return res.status(400).json({ message: "Missing invitation token for admin or superadmin registration." });
        }
  
        const invitation = await Invitation.findOne({
          token: invitationToken,
          email: email, // Optionally ensure the token is for the correct email
          role: role,
          used: false,
          expiresAt: { $gt: Date.now() }
        });
  
        if (!invitation) {
          return res.status(400).json({ message: "Invalid or expired invitation token." });
        }
  
        // Mark the invitation as used to prevent reuse
        invitation.used = true;
        await invitation.save();
      }

    // check if user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hashing password with bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      phoneNumber: phoneNumber,
      role: role,
      isAccessRevoked: isAccessRevoked,
    });

    const savedUser = await newUser.save();
    // send back everything except that the password
    // const data = { ...savedUser.toObject(), password: undefined };
    const { password: myPassword, ...others} = savedUser._doc;
    res.status(201).json({ message: "User created successfully", others });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.loginUser = async (req, res) => {
  try {
    // Check if email exists in the database
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email or password is incorrect"); // if no user returned

    // Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass)
      return res.status(400).send("Email or password is incorrect");

    // Create and assign a token
    //   const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    //   res.header("auth-token", token).send(token);

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
        role: user.role, // Include user's role in the token
        isAccessRevoked: user.isAccessRevoked,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;

    // update lastLogin date
    user.lastLogin = Date.now();
    user.save()
    res.status(200).json({ ...others, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
};



// admin generating invitation for another admin
exports.inviteAdmin = async (req, res) => {
  if (req.user.role !== 'superadmin') {
    return res.status(403).send("Unauthorized");
  }

  const { email, role } = req.body;
  const token = crypto.randomBytes(16).toString("hex"); 
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours validity

  const invitation = new Invitation({
    email,
    role,
    token,
    expiresAt
  });

  try {
    await invitation.save();
    // Send the token to the email provided
    await sendInvitationEmail({ to: email, token: token });
    res.send("Invitation sent successfully");
  } catch (err) {
    res.status(500).send("Server error");
  }
};
