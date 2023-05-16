const express = require('express');
const { startPayment, createPayment, getPayment, getBanks } = require('../controllers/payment');
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

module.exports = router;