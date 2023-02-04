const Blog = require('../models/Blog');

// create a new blog post
exports.createBlog = async (req, res) => {
    try {
        // Create a new blog
        const blog = new Blog({
            title: req.body.title,
            content: req.body.content,
            featuredImage: req.file.filename,
            author: req.user.id
        });

        // Save the blog to the database
        const savedBlog = await blog.save();

        res.status(201).json(savedBlog);
    } catch (error) {
        res.status(500).json(error);
    }
};

// updating a blog post
exports.updateBlog = async (req, res) => {
    try {
        const blogId = req.params.id;

        // Find the blog and update it
        const updatedBlog = await Blog.findByIdAndUpdate(blogId, req.body, { new: true });

        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(500).json(error);
    }
};

// deleting a blog post
exports.deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.id;

        // Find and delete the blog
        await Blog.findByIdAndDelete(blogId);

        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json(error);
    }
};

// deleting a blog post and all associated comments
exports.deleteBlogWithComments = async (req, res) => {
    try {
        const blogId = req.params.id;

        // Find the blog
        const blog = await Blog.findById(blogId);

        // Delete all comments associated with the blog
        await Comment.deleteMany({ blog: blog._id });

        // Delete the blog
        await Blog.findByIdAndDelete(blogId);

        res.status(200).json({ message: "Blog and associated comments deleted successfully" });
    } catch (error) {
        res.status(500).json(error);
    }
};


// getting a single blog post
exports.getBlog = async (req, res) => {
    try {
        const blogId = req.params.id;

        // Find the blog by id
        const blog = await Blog.findById(blogId);

        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json(error);
    }
};

// getting all blog posts
exports.getBlogs = async (req, res) => {
    try {
        // Get all blogs
        const blogs = await Blog.find();

        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json(error);
    }
};

// getting a blog post with all comments
exports.getBlogWithComments = async (req, res) => {
    try {
        const blogId = req.params.id;

        // Find the blog and populate the comments
        const blog = await Blog.findById(blogId).populate('comments');

        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json(error);
    }
};

// getting all blog posts with all respective comments
exports.getBlogsWithComments = async (req, res) => {
    try {
        // Get all blogs and populate the comments
        const blogs = await Blog.find().populate('comments');

        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json(error);
    }
};

// create a new comment
exports.createComment = async (req, res) => {
    try {
    // Create a new comment
    const comment = new Comment({
    content: req.body.content,
    author: req.user.id,
    blog: req.params.id
    });    
    // Save the comment to the database
    const savedComment = await comment.save();

    res.status(201).json(savedComment);
} catch (error) {
    res.status(500).json(error);
}};

// update a comment
exports.updateComment = async (req, res) => {
try {
const commentId = req.params.id;
    // Find the comment and update it
    const updatedComment = await Comment.findByIdAndUpdate(commentId, req.body, { new: true });

    res.status(200).json(updatedComment);
} catch (error) {
    res.status(500).json(error);
}};

// delete a comment
exports.deleteComment = async (req, res) => {
try {
const commentId = req.params.id;
    // Find and delete the comment
    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({ message: "Comment deleted successfully" });
} catch (error) {
    res.status(500).json(error);
}};
