const Blog = require('../models/Blog');

// create a new blog post
exports.createBlog = async (req, res) => {
    try {
        // Create a new blog
        const blog = new Blog({
            title: req.body.title,
            content: req.body.content,
            featuredImage: req.body.filename,
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

