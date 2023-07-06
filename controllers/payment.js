const PaymentService = require('../services/payment.service');

const paymentInstance = new PaymentService();

exports.startPayment = async (req, res) => {
    try{
        const response = await paymentInstance.startPayment(req.body);
        res.status(201).json({status: "Success", data : response});
    }catch(error){
        res.status(500).json({status: "Failed", message : error.message});
    }
}

exports.createPayment = async (req, res) => {
    try{
        console.log(`Query: ${req.query}`);
        console.log(`Req Body: ${req.body}`);
        const response = await paymentInstance.createPayment(req.query);
        res.status(201).json({status: "Success", data : response});
        // full_name not being passed
    }catch(error){
        res.status(500).json({status: "Failed", message : error.message});
    }
}

exports.getPayment = async (req, res) => {
    try{
        const response = await paymentInstance.paymentReciept(req.body);
        res.status(201).json({status: "Success", data : response});
    }catch(error){
        res.status(500).json({status: "Failed", message : error.message});
    }
}

exports.getBanks = async (req, res) => {
    try{
        const response = await paymentInstance.listBanks(req.body);
        res.status(201).json({status: "Success", data : response});
    }catch(error){
        res.status(500).json({status: "Failed", message : error.message});
    }
}

exports.getAccountDetails = async (req, res) => {
    try {
        const accountNumber = req.query.account_number;
        const bankCode = req.query.bank_code;
        const response = await paymentInstance.AccountDetails(accountNumber, bankCode);
        res.status(200).json({ status: 'success', data: response })
    } catch (error) {
        res.status(500).json({ status: "Failed", message: error.message });
    }
};