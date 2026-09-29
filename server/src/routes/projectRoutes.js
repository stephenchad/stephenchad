import express from "express";
import {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(getProjects).post(protect, createProject);
router
  .route("/:id")
  .put(protect, updateProject)
  .delete(protect, deleteProject);
router.get("/slug/:slug", getProjectBySlug);

export default router;