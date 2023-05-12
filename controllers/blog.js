const Blog = require("../models/Blog");
const Comment = require("../models/Comments");

// create a new blog post
exports.createBlog = async (req, res) => {
  try {
    // Create a new blog
    const blog = new Blog({
      title: req.body.title,
      content: req.body.content,
      featuredImage: req.body.featuredImage,
      author: req.user.id,
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
    let updateData = { ...req.body };

    if (req.file) {
      updateData.featuredImage = req.file.filename;
    }
    // Find the blog and update it
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, updateData, {
      new: true,
    });

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

        // Find the blog and remove it
        const blog = await Blog.findByIdAndRemove(blogId);

        // Find all comments associated with the blog and remove them
        await Comment.deleteMany({ blog: blogId });

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
// exports.getBlogs = async (req, res) => {
//   try {
//     // Get all blogs
//     const blogs = await Blog.find();

//     res.status(200).json(blogs);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };


// ************ Get blog posts with pagination ****************
// exports.getBlogs = async (req, res) => {
//   try {
//     const page = req.query.page || 1;
//     const limit = req.query.limit || 10;

//     const startIndex = (page - 1) * limit;
//     const endIndex = page * limit;

//     const blogs = await Blog.find().sort({ createdAt: -1 }).skip(startIndex).limit(limit);
//     const totalBlogs = await Blog.countDocuments();

//     const metadata = {
//       totalBlogs,
//       totalPages: Math.ceil(totalBlogs / limit),
//       currentPage: page,
//       hasNextPage: endIndex < totalBlogs,
//       hasPrevPage: startIndex > 0
//     };

//     res.status(200).json({ metadata, blogs });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };


// ******************** Get blog posts with search queries and pagination ********
exports.getBlogs = async (req, res) => {
  try {
    // Set default values for page and limit
    let { page = 1, limit = 10, search } = req.query;

    // Convert the page and limit values to integers
    page = parseInt(page);
    limit = parseInt(limit);

    // Set up the pagination options
    const skip = (page - 1) * limit;
    const options = {
      skip,
      limit
    };

    // Set up the search options if a search query is provided
    let searchOptions = {};
    if (search) {
      searchOptions = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } },
        ]
      };
    }

    // Find the total number of blogs based on the search options
    const totalBlogs = await Blog.countDocuments(searchOptions);

    // Find the blogs based on the search and pagination options
    const blogs = await Blog.find(searchOptions, null, options);

    // Create the metadata object with the pagination information
    const metadata = {
      page,
      limit,
      totalBlogs,
      totalPages: Math.ceil(totalBlogs / limit),
      hasNextPage: page * limit < totalBlogs,
      hasPrevPage: page > 1,
    };

    // Send the response with the metadata and the blogs
    res.status(200).json({ metadata, blogs });
  } catch (error) {
    res.status(500).json(error);
  }
};




// getting a blog post with all comments
exports.getBlogWithComments = async (req, res) => {
  try {
    const blogId = req.params.id;

    // Find the blog and populate the comments
    const blog = await Blog.findById(blogId).populate("comments");

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json(error);
  }
};

// exports.getBlogWithComments = async (req, res) => {
//     try {
//       const blogId = req.params.id;

//       // Find the blog and populate the comments
//       const blog = await Blog.findById(blogId)
//         .populate({
//           path: 'comments',
//           select: 'content author -_id',
//           populate: {
//             path: 'author',
//             select: 'username -_id'
//           }
//         });

//       res.status(200).json(blog);
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   };

// getting all blog posts with all respective comments
exports.getBlogsWithComments = async (req, res) => {
  try {
    // Get all blogs and populate the comments
    const blogs = await Blog.find().populate("comments");

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json(error);
  }
};

// ******************** Get blog posts with search queries and pagination ********
// exports.getBlogsgetBlogsWithComments = async (req, res) => {
//   try {
//     // Set default values for page and limit
//     let { page = 1, limit = 10, search } = req.query;

//     // Convert the page and limit values to integers
//     page = parseInt(page);
//     limit = parseInt(limit);

//     // Set up the pagination options
//     const skip = (page - 1) * limit;
//     const options = {
//       skip,
//       limit
//     };

//     // Set up the search options if a search query is provided
//     let searchOptions = {};
//     if (search) {
//       searchOptions = {
//         $or: [
//           { title: { $regex: search, $options: 'i' } },
//           { content: { $regex: search, $options: 'i' } },
//         ]
//       };
//     }

//     console.log(search, searchOptions);

//     // Find the total number of blogs based on the search options
//     const totalBlogs = await Blog.countDocuments(searchOptions);

//     // Find the blogs based on the search and pagination options
//     const blogs = await Blog.find(searchOptions, null, options).populate("comments");

//     // Create the metadata object with the pagination information
//     const metadata = {
//       page,
//       limit,
//       totalBlogs,
//       totalPages: Math.ceil(totalBlogs / limit),
//       hasNextPage: page * limit < totalBlogs,
//       hasPrevPage: page > 1,
//     };

//     // Send the response with the metadata and the blogs
//     res.status(200).json({ metadata, blogs });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };


// create a new comment
exports.createComment = async (req, res) => {
  try {
    // Create a new comment
    const comment = new Comment({
      content: req.body.content,
      author: req.user.id,
      blog: req.params.id,
    });

    // Save the comment to the database
    const savedComment = await comment.save();

    // Find the associated blog and update it with the new comment
    const blog = await Blog.findById(req.params.id);
    blog.comments.push(savedComment._id);

    // Save the changes to the database
    const updatedBlog = await blog.save();

    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json(error);
  }
};

// update a comment
exports.updateComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    // Find the comment and update it
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete a comment
exports.deleteComment = async (req, res) => {
  try {
    // Find the comment to be deleted
    const comment = await Comment.findById(req.params.id);

    // Remove the reference to this comment in the associated blog post
    const blog = await Blog.findById(comment.blog);
    blog.comments = blog.comments.filter(
      (c) => c._id.toString() !== req.params.id
    );
    await blog.save();

    // Delete the comment
    await comment.remove();

    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
};
