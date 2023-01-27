const router = require('express').Router();
const categoryController = require('../controllers/categoryController');
const { verifyTokenAndAdmin, verifyTokenAndAuthorization, verifyToken } = require('../controllers/verifyToken');

// create a new category
router.post('/', verifyTokenAndAdmin, categoryController.createCategory);

// update a category
router.put('/:id', verifyTokenAndAdmin, categoryController.updateCategory);

// delete a category
router.delete('/:id', verifyTokenAndAdmin, categoryController.deleteCategory);

// get a single category
router.get('/:id', categoryController.getCategory);

// get all categories
router.get('/', categoryController.getCategories);

module.exports = router;
