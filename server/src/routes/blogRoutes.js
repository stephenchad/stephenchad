import express from "express";
import {
  getPublishedBlogs,
  getBlogBySlug,
  getAllBlogsAdmin,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(getPublishedBlogs).post(protect, createBlog);
router.get("/admin/all", protect, getAllBlogsAdmin);
router.get("/slug/:slug", getBlogBySlug);
router
  .route("/:id")
  .put(protect, updateBlog)
  .delete(protect, deleteBlog);

export default router;