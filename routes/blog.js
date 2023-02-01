const {uploadImage}  = require('../middlewares/uploadFile');
const blogController = require('../controllers/blog');
const { verifyTokenAndAdmin, verifyTokenAndAuthorization, verifyToken } = require('../controllers/verifyToken');
const router = require('express').Router();

// create a new blog
router.post('/', verifyTokenAndAdmin, uploadImage.single('featuredImage'), blogController.createBlog);

// update a blog post
router.put('/:id', verifyTokenAndAdmin, uploadImage.single('featuredImage'), blogController.updateBlog);

// deleting a blog post
router.delete('/:id', verifyTokenAndAdmin, blogController.deleteBlog);

// deleting a blog post and all associated comments
router.delete('/:id/comments', verifyTokenAndAdmin, blogController.deleteBlogWithComments);

// getting a single blog post
router.get("/:id", blogController.getBlog);

// get a single blog post with all comments
router.get('/:id/comments', blogController.getBlogWithComments);

// get all blogs
router.get('/', blogController.getBlogs);

// get all blog posts with comments
router.get('/comments', blogController.getBlogsWithComments);

// create a new comment
router.post('/comment/:id', CommentController.createComment);

// update a comment
router.patch('/comment/:id', CommentController.updateComment);

// delete a comment
router.delete('/comment/:id', CommentController.deleteComment);