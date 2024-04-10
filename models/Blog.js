const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    featuredImage: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

// Middleware to automatically generate a slug before saving
// blogSchema.pre("save", async function(next) {
//   if (this.isModified("title")) {
//     let potentialSlug = slugify(this.title, { lower: true, strict: true });
//     let counter = 1;
//     while (await Blog.findOne({ slug: potentialSlug })) {
//       potentialSlug = `${slugify(this.title, { lower: true, strict: true })}-${counter}`;
//       counter++;
//     }
//     this.slug = potentialSlug;
//   }
//   next();
// });

module.exports = mongoose.model("Blog", blogSchema);
