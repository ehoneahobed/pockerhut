const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    
    billing_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Billing',
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    
}, {timestamps: true});


module.exports = mongoose.model('User', userSchema);