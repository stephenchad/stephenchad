import Blog from "../models/Blog.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { slugify } from "../utils/slugify.js";

// GET /api/blogs  (public, published only)
export const getPublishedBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({ status: "published" })
    .select("-content")
    .populate("author", "name")
    .sort({ publishedAt: -1, createdAt: -1 });
  res.json(blogs);
});

// GET /api/blogs/admin/all  (admin, includes drafts)
export const getAllBlogsAdmin = asyncHandler(async (req, res) => {
  const blogs = await Blog.find()
    .populate("author", "name")
    .sort({ createdAt: -1 });
  res.json(blogs);
});

// GET /api/blogs/:slug  (public, increments views)
export const getBlogBySlug = asyncHandler(async (req, res) => {
  const blog = await Blog.findOneAndUpdate(
    { slug: req.params.slug, status: "published" },
    { $inc: { views: 1 } },
    { new: true }
  ).populate("author", "name");

  if (!blog) {
    res.status(404);
    throw new Error("Blog post not found");
  }
  res.json(blog);
});

// POST /api/blogs  (admin)
export const createBlog = asyncHandler(async (req, res) => {
  const data = { ...req.body, author: req.user._id };
  if (!data.slug) data.slug = slugify(data.title);

  const exists = await Blog.findOne({ slug: data.slug });
  if (exists) {
    res.status(400);
    throw new Error("A post with that slug already exists");
  }

  if (data.status === "published" && !data.publishedAt) {
    data.publishedAt = new Date();
  }

  const blog = await Blog.create(data);
  res.status(201).json(blog);
});

// PUT /api/blogs/:id  (admin)
export const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404);
    throw new Error("Blog post not found");
  }

  // Set publishedAt if transitioning to published
  if (
    req.body.status === "published" &&
    blog.status !== "published" &&
    !blog.publishedAt
  ) {
    req.body.publishedAt = new Date();
  }

  Object.assign(blog, req.body);
  const updated = await blog.save();
  res.json(updated);
});

// DELETE /api/blogs/:id  (admin)
export const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404);
    throw new Error("Blog post not found");
  }
  await blog.deleteOne();
  res.json({ message: "Blog post deleted" });
});