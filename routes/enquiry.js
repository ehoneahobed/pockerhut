const express = require("express");
const router = express.Router();
const enquiryController = require("../controllers/enquiry");
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
  verifyToken,
} = require("../controllers/verifyToken");

router.post("/createEnquiry", enquiryController.createEnquiry);
router.put(
  "/updateEnquiry/:id",
  verifyTokenAndAdmin,
  enquiryController.updateEnquiry
);
router.get(
  "/getEnquiry/:id",
  verifyTokenAndAdmin,
  enquiryController.getEnquiry
);
router.get(
  "/getAllEnquiries",
  verifyTokenAndAdmin,
  enquiryController.getAllEnquiries
);
router.delete(
  "/deleteEnquiry/:id",
  verifyTokenAndAdmin,
  enquiryController.deleteEnquiry
);

module.exports = router;
