const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
    contact: {
        type: String
    },
    address_1: {
        type: String,
        required: true
    },
    address_2: {
        type: String
    },
    country: {
        type: String
    },
    
    state: {
        type: String,
    },
    town: {
        type: String
    }
    
}, {timestamps: true});


module.exports = mongoose.model('Billing', billingSchema);