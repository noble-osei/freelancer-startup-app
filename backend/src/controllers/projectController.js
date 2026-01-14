import asyncHandler from "../middleware/asyncHandler.js";
import Project from "../models/Project.js";
import AppError from "../utils/appError.js";

export const createProject = asyncHandler(async (req, res) => {
  const { title, description, owner } = req.body;

  if (!owner) return next(new AppError("Project owner is required", 400))

  await Project.create({ title, description, owner });

  res.status(201).json({ message: "Project added successfully"})
});

export const getProjects = asyncHandler(async (req, res) => {
  const owner = req.user?.id;
  let projects;

  if (req.user.role === "user") {
    projects = await Project.find({ owner: owner }).sort({ createdAt: -1 });
  } else if (req.user.role === "admin") {
    projects = await Project.find().sort({ createdAt: -1 });
  };

  res.json({ projects })
});

export const updateProject = asyncHandler(async (req, res) => {
  const projectId = req.params?.id;
  const { title, description } = req.body;

  const project = await Project.findById(projectId);

  if (!project) {
    throw new AppError("Project not found", 404)
  };

  if (req.user.role === "user") {
    if (project.owner.toString() !== req.user.id) {
      throw new AppError("Access denied - project not yours", 403)
    }
  };

  project.title = title ?? project.title;
  project.description = description ?? project.description;

  await project.save();

  res.json({ message: "Project updated successfully"});
});

export const deleteProject = asyncHandler(async (req, res) => {
  const projectId = req.params?.id;

  await Project.findByIdAndDelete(projectId);

  res.json({ message: "Project deleted"})
});