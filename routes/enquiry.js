const express = require("express");
const router = express.Router();
const enquiryController = require("../controllers/enquiry");
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
  verifyToken,
} = require("../controllers/verifyToken");

router.post("/create", enquiryController.createEnquiry);
router.patch(
  "/:id",
  verifyTokenAndAdmin,
  enquiryController.updateEnquiry
);
router.get(
  "/:id",
  verifyTokenAndAdmin,
  enquiryController.getEnquiry
);
router.get(
  "/",
  verifyTokenAndAdmin,
  enquiryController.getAllEnquiries
);
router.delete(
  "/:id",
  verifyTokenAndAdmin,
  enquiryController.deleteEnquiry
);

module.exports = router;
