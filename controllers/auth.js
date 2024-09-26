const bcrypt = require("bcrypt");
const User = require("../models/User");
const { Product } = require("../models/Product");
const Invitation = require("../models/AdminInvitation");
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const { sendInvitationEmail, sendEmail } = require('../services/email.service');
const { generateWelcomeEmail, generateNewWelcomeEmail } = require("../utils/emailTemplates");
const { default: axios } = require("axios");

exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber, role, isAccessRevoked, invitationToken } = req.body;
    if (role === 'admin' || role === 'superadmin') {
      if (!invitationToken) {
        return res.status(400).json({ message: "Missing invitation token for admin or superadmin registration." });
      }

      const invitation = await Invitation.findOne({
        token: invitationToken,
        email: email,
        role: role,
        used: false,
        expiresAt: { $gt: Date.now() }
      });

      if (!invitation) {
        return res.status(400).json({ message: "Invalid or expired invitation token." });
      }
      invitation.used = true;
      await invitation.save();
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
      isAccessRevoked
    });
    const savedUser = await newUser.save();
    
    const thankYouTemplate = generateWelcomeEmail(savedUser.firstName, savedUser.lastName, savedUser.email);
    await sendEmail({
      to: savedUser.email,
      subject: "Welcome to the platform",
      html: thankYouTemplate
    });
    let topProducts = [];
    try {
      const response = await axios.get(`${process.env.BASE_API_URL}/api/orders/admin/topProducts`);
      topProducts = response.data.slice(0, 3);
      console.log('topProducts', topProducts);
      console.log('topProducts.length', topProducts.length);
      if (topProducts.length  === 0) {
        const randomResponse = await axios.get(`${process.env.BASE_API_URL}/api/products`);
        topProducts = randomResponse.data.slice(0, 3);
      }
      console.log('topProducts2', topProducts);
    } catch (error) {
      topProducts = [];
    }
    if (topProducts.length < 3) {
      console.log("Not enough top products found, fetching from local database.");
    
      const localProducts = await Product.find().limit(3);
      const totalProducts = [...topProducts, ...localProducts].slice(0, 3);
      topProducts = totalProducts;
    }

    console.log("Top products", topProducts);
    
    const productDetails = topProducts.map(product => ({
      productName: product.information?.productName,
      productId: product._id,
      totalItemsSold: product.pricing?.quantity || 0,
      totalSales: product.totalSales || 0,
      productPrice: product.pricing?.productPrice || 0,
      image: product.images?.[0],
    }));    
    const thankYou = generateNewWelcomeEmail(savedUser.firstName, productDetails);
    await sendEmail({
      to: savedUser.email,
      subject: "Welcome to the platform",
      html: thankYou
    });    

    const { password: myPassword, ...others } = savedUser._doc;
    res.status(201).json({ message: "User created successfully", others });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
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
   if(user.status === 'inactive') {
    return res.status(400).send("Your account has been deactivated. Please contact the administrator for more information.");
   }
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

  console.log(invitation)
  try {
    await invitation.save();
    // Send the token to the email provided
    await sendInvitationEmail({ to: email, token: token });
    res.send("Invitation sent successfully");
  } catch (err) {
    console.error("Error saving invitation:", err);
  res.status(500).send("Server error: " + err.message);
  }
};
