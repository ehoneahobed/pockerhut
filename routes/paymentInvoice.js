const express = require('express');
const { getAllPaymentInvoices, getInvoiceTotals} = require('../controllers/paymentInvoice');


const router = express.Router()


router.get("/", getAllPaymentInvoices);
router.get('/totals',getInvoiceTotals);


module.exports = router;