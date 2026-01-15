import asyncHandler from "../middleware/asyncHandler.js";
import Project from "../models/Project.js";
import AppError from "../utils/appError.js";

export const createProject = asyncHandler(async (req, res) => {
  const { title, description, owner } = req.body;

  await Project.create({ title, description, owner });

  res.status(201).json({ message: "Project added successfully"})
});

export const getProjects = asyncHandler(async (req, res) => {
  const owner = req.user?.id;
  let projects;

  if (req.user.role === "user") {
    projects = await Project.find({ owner: owner });
  } else if (req.user.role === "admin") {
    projects = await Project.find();
  };

  res.json({ message: "Projects retrieved successfully", projects })
});

export const getProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const project = await Project.findById({ _id: projectId, owner: req.user?.id });

  res.json({ message: "Project retrieved successfully", project })
});

export const updateProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const updates = req.body;

  const project = await Project.findByIdAndUpdate(
    { _id: projectId, owner: req.user?.id },
    { $set: updates },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!project) { throw new AppError("Project not found", 404) };

  res.json({ message: "Project updated successfully"});
});

export const deleteProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  await Project.findByIdAndDelete(projectId);

  res.json({ message: "Project deleted"})
});