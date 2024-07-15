const mongoose = require('mongoose');

const paymentInvoiceSchema = new mongoose.Schema({
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true
    },
    payout: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['paid', 'unpaid', 'overdue']
    },
    startDate: {
        type: Date,
        required: true
    },
    currentWeek: {
        type: Number
    },
    dueDate: {
        type: Date,
        required: true
    },
    returnedOrders:{
        type: Number,
        required: false
    },
    salesRevenue:{
        type: Number,
        required: false
    },
    order: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    }]
}, {
    timestamps: true
});

const PaymentInvoice =  mongoose.model('PaymentInvoice', paymentInvoiceSchema);
module.exports = PaymentInvoice
