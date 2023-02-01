const mongoose = require('mongoose');

const productInformationSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    productBreed: {
        type: String,
        required: true,
    },
    typeOfMeat: {
        type: String,
        required: true,
    },
});

const productDetailsSchema = new mongoose.Schema({
    productWeight: {
        type: Number,
        required: true,
    },
    productContent: {
        type: String,
        required: true,
    },
    cookingMethod: {
        type: String,
        required: true,
    },
    deliveryDetails: {
        type: String,
        required: true,
    },
    productDescription: {
        type: String,
        required: true,
    },
});

const pricingSchema = new mongoose.Schema({
    saleStartDate: {
        type: Date,
        required: true,
    },
    saleEndDate: {
        type: Date,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});

const imagesSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    }
});

const productSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    information: {
        type: productInformationSchema,
        required: true,
    },
    details: {
        type: productDetailsSchema,
        required: true,
    },
    pricing: {
        type: pricingSchema,
        required: true,
    },
    images: [imagesSchema],
    approvalStatus: {
        type: Boolean,
        default: false,
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    }],
}, {timestamps: true});

module.exports = mongoose.model('Product', productSchema);
