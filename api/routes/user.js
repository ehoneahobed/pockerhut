const router = require('express').Router();
const { verifyTokenAndAdmin, verifyTokenAndAuthorization, verifyToken } = require('../controllers/verifyToken');

// import controllers
const authController = require('../controllers/auth');
const userController = require('../controllers/users');

// create new user
router.post('/signup', authController.registerUser);

// login user
router.get('/login', authController.loginUser);

// update user
router.put('/:id', verifyTokenAndAuthorization, userController.updateUser);

// delete user
router.delete('/:id', verifyTokenAndAuthorization, userController.deleteUser);

// get a single user
router.get('/:id', verifyTokenAndAuthorization, userController.getUser);

// get all users (only admins can)
router.get('/', verifyTokenAndAdmin, userController.getUsers);

// add billing information
router.post('/billing', verifyToken, userController.createBilling);

module.exports = router;