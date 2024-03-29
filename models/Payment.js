const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    full_name : {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    reference : {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        required: true
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        // required: true
    }
},
{
    timestamps: true
})

module.exports =  mongoose.model('Payment', paymentSchema);
