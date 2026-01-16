import Joi from "joi";
import { objectId } from "./common.js";

const taskFields = {
  title: Joi.string(),
  description: Joi.string(),
  status: Joi.string().valid("todo", "in Progress", "done")
};

export const createTaskBodySchema = Joi.object({
  ...taskFields,
  title: taskFields.title.required()
});

export const updateTaskBodySchema = Joi.object(taskFields).min(1);

export const tasksIdParamsSchema = Joi.object({ 
  projectId: objectId.required(),
  taskId: objectId.required() 
});