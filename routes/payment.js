const express = require('express');
const { startPayment, createPayment, getPayment, getBanks, getAccountDetails } = require('../controllers/payment');
const {
    verifyTokenAndAdmin,
    verifyTokenAndAuthorization,
    verifyToken,
  } = require("../controllers/verifyToken");

const router = express.Router()

router.post('/', startPayment);
router.get('/create', createPayment);
router.get('/details', getPayment);
router.get('/banks', getBanks);
router.get('/account-details', getAccountDetails);

module.exports = router;
