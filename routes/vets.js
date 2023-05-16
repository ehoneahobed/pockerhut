const express = require('express');
const router = express.Router();
const vetController = require('../controllers/vets');

const { productImageUpload } = require("../middlewares/uploadFile");

const {
    verifyTokenAndAdmin,
    verifyTokenAndAuthorization,
    verifyToken,
  } = require("../controllers/verifyToken");

router.post('/', verifyTokenAndAuthorization, productImageUpload, vetController.createVet);
router.get('/', verifyTokenAndAuthorization, vetController.getVets);
router.get('/:id', verifyTokenAndAuthorization, vetController.getVet);
router.put('/:id', verifyTokenAndAuthorization, productImageUpload, vetController.updateVet);
router.delete('/:id', verifyTokenAndAuthorization, vetController.deleteVet);

module.exports = router;
