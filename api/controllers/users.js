const User = require('../models/User');
const Billing = require('../models/Billing');
const bcrypt = require('bcrypt');

// update user
exports.updateUser = async (req, res) => {
    if (req.body.password) {
        const saltRounds = 10;
        req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        // return everything except the password
        const { password, ...others } = updatedUser._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
}

// delete user
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted successfully!");
    } catch (error) {
        res.status(500).json(error);
    }
}

// get a single user
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
}

// get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();

        // sanitize users and remove their passwords
        const sanitizedUsers = users.map(user => {
            const { password, ...others } = user._doc;
            return others;
        })

        res.status(200).json(sanitizedUsers);
    } catch (error) {
        res.status(500).json(error);
    }
}

// create user billing
exports.createBilling = async (req, res) => {
    try {

        //  check if the optional fields were provided or not
        const fields = ['contact', 'address_1', 'address_2', 'country', 'state', 'town'];

        const data = fields.map(field => {
            if (req.body.hasOwnProperty(field)) {
                return { [field]: req.body[field] };
            }
        });

        user_id = req.user.id;

        const billingFields = Object.assign({}, ...data, {user_id});
        const billing = new Billing(billingFields);


        const savedBilling = await billing.save();

        res.status(200).json(savedBilling);
    } catch (error) {
        res.status(500).json(error);
    }
}