import Joi from "joi";

const taskFields = {
  title: Joi.string(),
  description: Joi.string(),
  status: Joi.string().valid("todo", "in Progress", "done")
};

export const createTaskBodySchema = Joi.object({
  ...taskFields,
  title: taskFields.title.required(),
  status: taskFields.status.required()
});

export const updateTaskBodySchema = Joi.object(taskFields).min(1);