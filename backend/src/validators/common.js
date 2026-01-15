import Joi from "joi";

export const objectId = Joi.Joi.string().hex().length(24);