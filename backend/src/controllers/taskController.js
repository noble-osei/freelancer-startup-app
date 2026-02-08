import asyncHandler from "../middleware/asyncHandler.js";
import Project from "../models/Project.js";
import Task from "../models/Task.js";
import AppError from "../utils/appError.js";

export const getTasks = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const tasks = await Task.find({ project: projectId });

  res.json({ message: "Tasks retrieved successfully", tasks })
});

export const getTask = asyncHandler(async (req, res) => {
  const { projectId, taskId } = req.params;

  const task = await Task.findById({ _id: taskId, project: projectId });

  res.json({ message: "Task retrieved successfully", task });
});

export const createTask = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const { projectId } = req.params;
  const project = await Project.findById(projectId);
  
  if (!project) { throw new AppError("Project does not exist", 400)}

  await Task.create({ title, description, project: projectId });

  res.status(201).json({ message: "Task created successfully"})
});

export const updateTask = asyncHandler(async (req, res) => {
  const updates = req.body;
  const { projectId, taskId } = req.params;

  const task = await Task.findByIdAndUpdate(
    { _id: taskId, project: projectId },
    { $set: updates },
    {
      new: true,
      runValidators: true
    }
  );

  if (!task) { throw new AppError("Task not found", 404) };

  res.json({ message: "Task updated successfully" });
});

export const deleteTask = asyncHandler(async (req, res) => {
  const { projectId, taskId } = req.params;

  await Task.findByIdAndDelete({ _id: taskId, project: projectId });

  res.json({ message: "Task deleted"})
});