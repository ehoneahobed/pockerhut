// Create Vendor
exports.createVendor = async (req, res) => {
    // Validate the request
    if (!req.body.sellerAccountInformation || !req.body.businessInformation || !req.body.vendorBankAccount) {
        return res.status(400).send({
            message: "Seller account information, business information and vendor bank account are required"
        });
    }

    // Create a new vendor
    const vendor = new Vendor({
        sellerAccountInformation: req.body.sellerAccountInformation,
        businessInformation: req.body.businessInformation,
        vendorBankAccount: req.body.vendorBankAccount,
        storeStatus: req.body.storeStatus || "pending"
    });

    try {
        // Save the vendor in the database
        const data = await vendor.save();
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the vendor."
        });
    }
};

// Update Vendor
exports.updateVendor = async (req, res) => {
    // Validate the request
    if (!req.body.sellerAccountInformation || !req.body.businessInformation || !req.body.vendorBankAccount) {
        return res.status(400).send({
            message: "Seller account information, business information and vendor bank account are required"
        });
    }

    // Find the vendor and update it with the request body
    try {
        const vendor = await Vendor.findByIdAndUpdate(req.params.vendorId, {
            sellerAccountInformation: req.body.sellerAccountInformation,
            businessInformation: req.body.businessInformation,
            vendorBankAccount: req.body.vendorBankAccount,
            storeStatus: req.body.storeStatus || "pending"
        }, { new: true });
        if (!vendor) {
            return res.status(404).send({
                message: "Vendor not found with id " + req.params.vendorId
            });
        }
        res.send(vendor);
    } catch (err) {
        if (err.kind === "ObjectId") {
            return res.status(404).send({
                message: "Vendor not found with id " + req.params.vendorId
            });
        }
        return res.status(500).send({
            message: "Error updating vendor with id " + req.params.vendorId
        });
    }
};