import Joi from "joi";

export const signupSchema = Joi.object({
  name: Joi.string().required().trim(),
  username: Joi.string().required().trim(),
  email: Joi.string().email().required().trim(),
  password: Joi.string().min(8).max(30).required(),
  role: Joi.string().valid("user", "admin")
});

export const loginSchema = Joi.object({
  usernameOrEmail: Joi.string().required(),
  password: Joi.string().min(8).max(30).required(),
  rememberMe: Joi.boolean().required()
}); 