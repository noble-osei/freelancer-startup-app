import Joi from "joi";

export const userBodySchema = Joi.object({
  name: Joi.string().required().trim(),
  username: Joi.string().required().trim(),
  email: Joi.string().email().required().trim(),
  password: Joi.string().min(8).max(30).required(),
  role: Joi.string().valid("user", "admin")
});

export const projectBodySchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string()
});

export const taskBodySchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  status: Joi.string().valid("todo", "in Progress", "done").required()
});

export const idSchema = Joi.object({
  id: Joi.string().hex().length(24).required()
});