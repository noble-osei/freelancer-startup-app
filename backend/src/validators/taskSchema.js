import Joi from "joi";
import { objectId } from "./common.js";

const taskFields = {
  title: Joi.string().min(3).max(100),
  description: Joi.string().max(500),
  status: Joi.string().valid("todo", "in-progress", "done")
};

export const createTaskBodySchema = Joi.object({
  ...taskFields,
  title: taskFields.title.required()
});

export const updateTaskBodySchema = Joi.object(taskFields).min(1);

export const tasksIdParamsSchema = Joi.object({ 
  taskId: objectId.required() 
});