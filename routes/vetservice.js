const express = require("express");
const router = express.Router();
const vetserviceController = require("../controllers/vetservice");

// Create a new vetservice request
router.post("/", vetserviceController.createVetservice);

// Get a specific vetservice request
router.get("/:id", vetserviceController.getVetservice);

// Update a specific vetservice request
router.put("/:id", vetserviceController.updateVetservice);

// Delete a specific vetservice request
router.delete("/:id", vetserviceController.deleteVetservice);

// Get all vetservice requests
router.get("/", vetserviceController.getAllVetservices);

module.exports = router;
