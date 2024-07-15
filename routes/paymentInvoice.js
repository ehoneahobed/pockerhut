const express = require('express');
const { getAllPaymentInvoices, getInvoiceTotals, updateMultipleStatuses} = require('../controllers/paymentInvoice');


const router = express.Router()


router.get("/", getAllPaymentInvoices);
router.get('/totals',getInvoiceTotals);
router.put('/multiple', updateMultipleStatuses)

module.exports = router;