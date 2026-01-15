import Joi from "joi";
import { objectId } from "./common.js";

const projectFields = {
  title: Joi.string().min(3).max(100),
  description: Joi.string().max(500),
  owner: Joi.string().hex().length(24)
};

export const createProjectBodySchema = Joi.object({
  ...projectFields,
  title: projectFields.title.required(),
  owner: projectFields.owner.required()
});

export const updateProjectBodySchema = Joi.object(projectFields).min(1);

export const projectIdParamsSchema = Joi.object({ projectId: objectId.required() });