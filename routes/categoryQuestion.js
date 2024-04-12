const router = require('express').Router();
const categoryQuestionController = require('../controllers/categoryQuestion');
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
  verifyToken,
} = require('../controllers/verifyToken');

// Create new category questions
// router.post('/', verifyTokenAndAdmin, categoryQuestionController.createCategoryQuestions);
router.post('/', categoryQuestionController.createCategoryQuestions);

// create multiple category questions
router.post('/batch', categoryQuestionController.createBatchCategoryQuestions);

// Update a category question
router.put('/:id', verifyTokenAndAdmin, categoryQuestionController.updateCategoryQuestion);

// Delete a category question
router.delete('/:id', verifyTokenAndAdmin, categoryQuestionController.deleteCategoryQuestion);

// Get a single category question
router.get('/:id', categoryQuestionController.getCategoryQuestion);

// Get all category questions for a given category
router.get('/category/:categoryId', categoryQuestionController.getCategoryQuestions);

// Get all category questions
router.get('/', categoryQuestionController.getAllCategoryQuestions);

module.exports = router;
