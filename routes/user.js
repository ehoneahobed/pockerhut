const router = require("express").Router();
const {
  verifyTokenAndAdmin,
  verifyTokenAndSuperAdmin,
  verifyTokenAndAuthorization,
  verifyToken,
} = require("../controllers/verifyToken");

// import controllers
const authController = require("../controllers/auth");
const userController = require("../controllers/users");

// create new user
router.post("/signup", authController.registerUser);

// login user
router.post("/login", authController.loginUser);

// update user
router.put("/:id", verifyTokenAndAuthorization, userController.updateUser);

// delete user
router.delete("/:id", verifyTokenAndAuthorization, userController.deleteUser);

// get a single user
router.get("/:id", verifyTokenAndAuthorization, userController.getUser);

// get all users (only admins can)
router.get("/", verifyTokenAndAdmin, userController.getUsers);

// get admins and superadmin (only superadmin can)
router.get("/admin",   verifyTokenAndSuperAdmin, userController.getAdminUsers);

// Request password reset email
router.post('/request-reset-password', userController.sendPasswordResetEmail);

// reset password endpoint
router.post('/reset-password/:token', userController.resetPassword);

// // add billing information
// router.post("/billing", verifyToken, userController.createBilling);

// // get user billing information
// router.get(
//   "/billing/:id",
//   verifyTokenAndAuthorization,
//   userController.getUserBilling
// );

// // get all users with their respective billing information
// router.get("/billing", verifyTokenAndAdmin, userController.getUsersWithBilling);


// Add billing information
router.post("/billing", verifyToken, userController.createBilling);

// Get user billing information
router.get("/billing/:id", verifyTokenAndAuthorization, userController.getUserBilling);

// Update user billing information
router.put("/billing/:id", verifyTokenAndAuthorization, userController.updateBilling);

// Delete user billing information
router.delete("/billing/:id", verifyTokenAndAuthorization, userController.deleteBilling);

// Get all users with their respective billing information
router.get("/billing/all", verifyTokenAndAdmin, userController.getUsersWithBilling);


// invite new admin user
router.post("/admin-invite/", authController.inviteAdmin)

module.exports = router;
