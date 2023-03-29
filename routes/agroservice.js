const express = require("express");
const agroserviceController = require("../controllers/agroservice");

const {
    verifyTokenAndAdmin,
    verifyTokenAndAuthorization,
    verifyToken,
  } = require("../controllers/verifyToken");
  

const router = express.Router();

router.post("/", agroserviceController.createAgroservice);
router.delete("/:id", verifyTokenAndAdmin, agroserviceController.deleteAgroservice);
router.patch("/:id", agroserviceController.updateAgroservice);
router.get("/:id", verifyTokenAndAdmin, agroserviceController.getAgroservice);
router.get("/", verifyTokenAndAdmin, agroserviceController.getAllAgroservices);

module.exports = router;
