const bcrypt = require('bcrypt');
const User = require('../models/User');

const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, role } = req.body;
        // hashing password with bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        const newUser = new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
            role: role
        });

        const savedUser = await newUser.save();
        res.status(201).json({ message: 'User created successfully', savedUser });

    } catch (error) {
        res.status(500).json({ error });
    }
};