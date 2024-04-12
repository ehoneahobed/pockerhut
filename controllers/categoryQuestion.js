const CategoryQuestion = require('../models/CategoryQuestion');

// add new questions
exports.createCategoryQuestions = async (req, res) => {
    try {
        const { categoryId, questions } = req.body;

        // create an array to store the category questions
        const categoryQuestions = [];

        // Iterate over the questions array and create category questions
        for (const questionData of questions) {
            const { question, required, questionHint } = questionData;

            // create a new category question
            const categoryQuestion = new CategoryQuestion ({
                category: categoryId,
                question,
                required,
                questionHint
            });

            // Add the category question to the array
            categoryQuestions.push(categoryQuestion);
        }

        // Save the category questions to the array
        const savedCategoryQuestions = await CategoryQuestion.insertMany(categoryQuestions);

        res.status(201).json({ message: 'success', savedCategoryQuestions });
    } catch (error) {
        return res.status(500).json({ message: 'failed', error})
    }
}

// Add new multiple category questions
exports.createBatchCategoryQuestions = async (req, res) => {
  const { categoryId, questions } = req.body; // Expect an array of questions in the body

  try {
      // Validate the category exists first
      const categoryExists = await Category.findById(categoryId);
      if (!categoryExists) {
          return res.status(404).json({ message: 'Category not found' });
      }

      // Map over the questions array to create new question objects
      const questionsToCreate = questions.map(question => ({
          category: categoryId,
          question: question.question,
          required: question.required,
          questionHint: question.questionHint || ""  // Use empty string if no hint provided
      }));

      // Use insertMany to add all questions at once
      const createdQuestions = await CategoryQuestion.insertMany(questionsToCreate);

      res.status(201).json({ message: 'Category questions created successfully', data: createdQuestions });
  } catch (error) {
      console.error('Error creating category questions:', error);
      res.status(500).json({ message: 'Failed to create category questions', error: error.message });
  }
};

// Update a category question
exports.updateCategoryQuestion = async (req, res) => {
    try {
      const questionId = req.params.id;
      const { question, required, questionHint } = req.body;
  
      // Find the category question by ID
      const categoryQuestion = await CategoryQuestion.findById(questionId);
  
      if (!categoryQuestion) {
        return res.status(404).json({ message: 'Category question not found' });
      }
  
      // Update the category question properties
      categoryQuestion.question = question;
      categoryQuestion.required = required;
      categoryQuestion.questionHint = questionHint;
  
      // Save the updated category question to the database
      const updatedCategoryQuestion = await categoryQuestion.save();
  
      res.status(200).json(updatedCategoryQuestion);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  // Delete a category question
exports.deleteCategoryQuestion = async (req, res) => {
    try {
      const questionId = req.params.id;
  
      // Find and delete the category question
      await CategoryQuestion.findByIdAndDelete(questionId);
  
      res.status(200).json({ message: 'Category question deleted successfully' });
    } catch (error) {
      res.status(500).json(error);
    }
  };

  // Get a single category question
exports.getCategoryQuestion = async (req, res) => {
    try {
      const questionId = req.params.id;
  
      // Find the category question by ID
      const categoryQuestion = await CategoryQuestion.findById(questionId);
  
      if (!categoryQuestion) {
        return res.status(404).json({ message: 'Category question not found' });
      }
  
      res.status(200).json(categoryQuestion);
    } catch (error) {
      res.status(500).json(error);
    }
  };

// Get all category questions for a given category
exports.getCategoryQuestions = async (req, res) => {
    try {
      const categoryId = req.params.categoryId;
  
      // Find all category questions for the given category
      const categoryQuestions = await CategoryQuestion.find({ category: categoryId });
  
      res.status(200).json(categoryQuestions);
    } catch (error) {
      res.status(500).json(error);
    }
  };

// Get all category questions
exports.getAllCategoryQuestions = async (req, res) => {
  try {
    // Find all category questions
    const categoryQuestions = await CategoryQuestion.find();

    res.status(200).json(categoryQuestions);
  } catch (error) {
    res.status(500).json(error);
  }
};
