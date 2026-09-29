import Project from "../models/Project.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { slugify } from "../utils/slugify.js";

// GET /api/projects  (public — supports ?featured=true)
export const getProjects = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.featured === "true") filter.featured = true;

  const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });
  res.json(projects);
});

// GET /api/projects/:slug
export const getProjectBySlug = asyncHandler(async (req, res) => {
  const project = await Project.findOne({ slug: req.params.slug });
  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }
  res.json(project);
});

// POST /api/projects  (admin)
export const createProject = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (!data.slug) data.slug = slugify(data.title);

  const exists = await Project.findOne({ slug: data.slug });
  if (exists) {
    res.status(400);
    throw new Error("A project with that slug already exists");
  }

  const project = await Project.create(data);
  res.status(201).json(project);
});

// PUT /api/projects/:id  (admin)
export const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  Object.assign(project, req.body);
  if (req.body.title && !req.body.slug) {
    project.slug = slugify(req.body.title);
  }

  const updated = await project.save();
  res.json(updated);
});

// DELETE /api/projects/:id  (admin)
export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }
  await project.deleteOne();
  res.json({ message: "Project deleted" });
});