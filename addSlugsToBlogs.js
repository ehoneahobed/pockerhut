const mongoose = require('mongoose');
const Blog = require('./models/Blog'); // Adjust the path to your Blog model
const slugify = require('slugify');
require('dotenv').config(); // at the top of your script


mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_URI).then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Database connected and Backend server is running successfully on port ${process.env.PORT}`);
    })
}).catch((error) => {
    console.log(error);
})

async function addSlugsToExistingBlogs() {
  try {
    const blogs = await Blog.find({ slug: { $exists: false } });

    for (let blog of blogs) {
      blog.slug = await generateUniqueSlug(blog.title);
      await blog.save();
      console.log(`Updated blog with ID: ${blog._id} with new slug: ${blog.slug}`);
    }

    console.log('All blogs without slugs have been updated.');
  } catch (error) {
    console.error('Error updating blogs with slugs:', error);
  }
}


async function generateUniqueSlug(title) {
    let potentialSlug = slugify(title, { lower: true, strict: true });
    let counter = 1;
    while (await Blog.findOne({ slug: potentialSlug })) {
      potentialSlug = `${slugify(title, { lower: true, strict: true })}-${counter}`;
      counter++;
    }
    return potentialSlug;
  }
  

// Run the function or export it to be run elsewhere
addSlugsToExistingBlogs();
