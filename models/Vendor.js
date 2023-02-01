const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VendorSchema = new Schema({
    sellerAccountInformation: {
        shopName: { type: String, required: true },
        entityType: { type: String, required: true },
        accountOwnersName: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        additionalPhoneNumber: String,
        password: { type: String, required: true }
    },
    businessInformation: {
        companyRegisteredName: { type: String, required: true },
        address1: { type: String, required: true },
        address2: String,
        city: { type: String, required: true },
        businessOwnerName: { type: String, required: true },
        dateOfBirth: { type: String, required: true },
        IDType: { type: String, required: true },
        IDFile: { type: String, required: true },
        CACRegistrationNumber: { type: String, required: true },
        CACCertificateFile: { type: String, required: true },
        TINCertificateFile: { type: String, required: true },
        VATRegistered: { type: String, required: true }
    },
    storeStatus: { type: String, required: true },
    vendorBankAccount: {
        bankName: { type: String, required: true },
        accountName: { type: String, required: true },
        accountNumber: { type: String, required: true }
    }
});

module.exports = mongoose.model("Vendor", VendorSchema);
