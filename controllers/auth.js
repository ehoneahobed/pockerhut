const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

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
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
};
